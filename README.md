# MyAwesomeBooks Project

This is the first project for Udacity's React Fundamentals course, the goal of this project is to provide
an web interface where the users can find books and clasify them in three categories: Readed, want to read and in progress. 

## How to install and start

To get started developing right saway:

* install all project dependencies with `npm install`
* start the development server with `npm start`


## Evaluation list

* Is the application easy to install and start?
Yes, as simple as `npm install && npm start`

* Does the application include README with clear installation and launch instructions?
Well...

* Does the main page show three categories (or “bookshelves”) for books (currently reading, want to read, and read)?
Yes, in fact the shelves where replaced with tabs, is more friendly. Thanks to `react-tabs` component.

* Does the main page allow users to move books between shelves?
Yes, thanks for the API!

* Does information persist between page refreshes?
Yes, no comments.

* Does the search page have a search input that lets users search for books?
Yes, the search page has an input search field, new cool css. 

* Do the search results allow a user to categorize a book as “currently reading”, “want to read”, or “read”?
Yes.

* Do selections made on the search page show up on the main page?
Yes.

* Does the main page link to the search page?
Yes, in fact there are 2 links.

* Does the search page link back to the main page?
Yes.

* Does the project code handle state management appropriately?
Yes.

* Is JSX formatted properly?
Well, Four new components were created: Book, BookGrid, BookSearch, and myBooks. In order to represent the
idea of small and functional components. 

## Above and beyond
Extra components are present in this code:
* filter input:
In the main page, a filter is above the tabs, this input filter by Author and name of books in the three categories.

* Tabs:
The divs where replaced with tabs, more organized info for the user, also the tabs have an counter of the amount of books in each category, this count is updated by the filter.

* highlight:
When a filter is used, the match string in Authors or Title is highlighted to show the coincidendes.
