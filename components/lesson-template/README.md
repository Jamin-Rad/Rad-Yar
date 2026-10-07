# Standard lesson template

`StandardLessonShell` is the reusable contract for RadYar lesson pages.

- `Newsreader` is used for editorial headings; `Inter` is used for UI and body copy.
- Every lesson supplies its own `backgroundImage` and palette through the `theme` prop.
- The hero action order is Take Home Message, MCQ, then Flashcards. Real lessons provide lesson-specific links; the test page may keep actions inert.
- Only teaching sections count toward progress. The emphasized Take Home Message is a summary and is excluded from read tracking and the learning-path sidebar.
- `LessonSection` provides the standard accordion and read-state control.
- `TakeHomeList` keeps multiple expanded points open at the same time.
- `LessonSources` belongs below the complete lesson, not inside a single section.
- Page-specific teaching modules, tables, cases, and images stay in the lesson module and inherit the shell typography and color tokens.
