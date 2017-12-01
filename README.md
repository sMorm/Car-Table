# Car Table

A simple web application that helps compare prices and milage for numerous vehicles.
Demo: http://www.cs.uml.edu/~smorm/461f2017/hw6/

I decided to use the React library because of how it efficient it is to update an array of objects. In this
case, updating the table array is more efficient using the virtual DOM. Instead of using the jQuery validation
library, I decided to write my own functions because in this case, we only need to validate that the values
are not negative, or when the user tries to update the table with empty fields.

When restricted values like an empty input, or negative values, the application will scroll back up to the
input fields and animate the error in red to warn the user and direct them to fix them.

Using React Tabs, we are able to achieve the same functionality as jQuery Tabs, but more efficient when
updating the elements when it comes to animations.

BONUS: All entries are saved in the browser, so when the user revisits the page, it will reload their
old entries. To test, refresh your browser after creating an entry.

New Functionalities
- Two-way binding sliders
- Ability to add names to entries
- Remove entries
- Tabbed Entries
- Local Caching to save entries and sessions
