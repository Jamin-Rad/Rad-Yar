import Foundation
final class StubProtocol: URLProtocol {
    static var status = 200
    static var output = Data()
    static var requests: [URLRequest] = []
    static var bodies: [Data] = []
    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }
    override func stopLoading() {}
    override func startLoading() {
        Self.requests.append(request)
        var data = request.httpBody ?? Data()
        if let stream=request.httpBodyStream { stream.open(); defer { stream.close() }; var buffer=[UInt8](repeating:0,count:4096)
            while stream.hasBytesAvailable { let n=stream.read(&buffer,maxLength:buffer.count);if n<=0 { break };data.append(buffer,count:n) }
        }
        Self.bodies.append(data)
        client?.urlProtocol(self,didReceive:HTTPURLResponse(url:request.url!,statusCode:Self.status,httpVersion:nil,headerFields:nil)!,cacheStoragePolicy:.notAllowed)
        client?.urlProtocol(self,didLoad:Self.output);client?.urlProtocolDidFinishLoading(self)
    }
}
@main struct NetworkTests {
    static func main() async throws {
        var n=0
        func check(_ value:Bool,_ text:String) { precondition(value,text);n+=1 }
        let config=URLSessionConfiguration.ephemeral;config.protocolClasses=[StubProtocol.self]
        let api=CalendarAPI(configuration:config)
        StubProtocol.output=Data("{\"token\":\"test-only\"}".utf8)
        let token=try await api.login(password:"synthetic")
        check(token=="test-only","login decodes")
        check(StubProtocol.requests.last?.url?.absoluteString=="https://www.rad-yar.com/api/andarun/login","canonical HTTPS login")
        check(StubProtocol.requests.last?.value(forHTTPHeaderField:"X-Andarun-Token")==nil,"login carries no prior token")
        let event=CalendarEvent(title:"Synthetic",start:CalendarDates.make(2026,11,10,11),end:CalendarDates.make(2026,11,10,12))
        var saved=event;saved.updatedAt="2026-11-10T10:00:00Z"
        let wire=try JSONSerialization.jsonObject(with:JSONEncoder().encode(CalendarWireEvent(saved)))
        StubProtocol.output=try JSONSerialization.data(withJSONObject:["event":wire])
        let mutation=CalendarMutation(event:event,expectedUpdatedAt:nil)
        _=try await api.send(mutation,token:token)
        let body=try JSONSerialization.jsonObject(with:StubProtocol.bodies.last!) as! [String:Any]
        check(body["expectedUpdatedAt"] is NSNull,"create sends explicit null base")
        check(body["mutationId"] as? String==mutation.id.uuidString,"stable receipt ID")
        check(StubProtocol.requests.last?.value(forHTTPHeaderField:"X-Andarun-Token")==token,"auth header")
        StubProtocol.output=try JSONSerialization.data(withJSONObject:["events":[wire],"nextCursor":NSNull()])
        let events=try await api.fetch(token:token);check(events.count==1 && events[0].start==event.start,"remote dates decode in Berlin")
        StubProtocol.status=409;StubProtocol.output=try JSONSerialization.data(withJSONObject:["error":"changed","current":wire])
        do { _=try await api.send(mutation,token:token);fatalError("expected conflict") } catch CalendarAPIError.conflict(_,let current) { check(current?.id==event.id,"conflict includes remote snapshot") }
        StubProtocol.status=401
        do { _=try await api.fetch(token:token);fatalError("expected auth error") } catch CalendarAPIError.unauthorized { check(true,"401 maps to reauth") }
        StubProtocol.status=200;StubProtocol.output=Data("garbage".utf8)
        do { _=try await api.fetch(token:token);fatalError("expected invalid response") } catch CalendarAPIError.invalidData { check(true,"invalid data cannot erase cache") }
        print("Passed \(n) HTTP contract checks")
    }
}
