# Question files

The website loads these files at runtime:

- `technical_questions.xlsx`
- `psychometric_questions.csv`

After hosting, replace these files on the server or redeploy with updated copies to update the website questions.
On GitHub Pages, commit and push the updated file so Pages rebuilds and publishes it.

Technical questions:

- Use one sheet per department, such as `cse`, `it`, `ece`, `aids`, `mech`, `maths`.
- Required columns: `subject`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`.
- `correct_option` is 1-based, so `1` means option1 and `4` means option4.

Psychometric questions:

- Required columns: `question`, `option1`, `option2`, `option3`, `option4`, `answer_index`.
- `answer_index` is 1-based, so `1` means option1 and `4` means option4.
- Optional columns: `department`, `subject`, `category`.
- If `department` or `subject` are present, the website filters psychometric questions by the candidate's department and selected technical subjects.
