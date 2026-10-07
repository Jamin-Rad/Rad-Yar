# Standard lesson template

`StandardLessonShell` is the reusable contract for RadYar lesson pages.

- `Newsreader` is used for editorial headings; `Inter` is used for UI and body copy.
- Every lesson supplies its own ambient `backgroundImage`, compact subject-specific `heroImage`, optional `heroImageOpacity`, and palette through the `theme` prop. The ambient image covers the lesson; the subject image is rendered inside and clipped to the title area.
- Hero artwork is displayed at 1.5× scale. In Persian/RTL it moves to the left and mirrors so the title keeps clear reading space.
- The hero action order is Take Home Message, MCQ, then Flashcards. Real lessons provide lesson-specific links; the test page may keep actions inert.
- Only teaching sections count toward progress. The emphasized Take Home Message is a summary and is excluded from read tracking and the learning-path sidebar.
- The first teaching section opens on entry. Opening another teaching section closes the previous one, and Lernpfad navigation aligns the selected section at the top of the viewport.
- Take Home Message starts closed and uses its own disclosure state, independent of the teaching-section accordion.
- `LessonSection` provides the standard accordion and read-state control. Its read-state control is always the final item, including in section bodies that visually reorder examples.
- `TakeHomeList` keeps multiple expanded points open at the same time.
- `LessonSources` belongs below the complete lesson, not inside a single section.
- `InteractiveTeachingGroups` is the standard pattern when one section contains two or more clearly separated teaching sub-sections: topics are selected on the left and their explanation appears on the right. Use its optional visual renderer for a compact diagram or image that changes with the selected topic.
- In Persian/RTL, `InteractiveTeachingGroups` reverses that desktop layout: topics are selected on the right and their explanation appears on the left. The mobile layout remains stacked.
- Page-specific teaching modules, tables, cases, and images stay in the lesson module and inherit the shell typography and color tokens.
