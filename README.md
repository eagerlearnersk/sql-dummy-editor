# ** SQL RUNNER **
### header H3
 web-based application capable of running SQL queries 

 ----

## **Features**

- **Split View**: Adjustable query and result panels for better UX.
- **Query Screen**
        1. **Create More button** - lets user have a text input where user can enter query
        2. **Save button** - to commit to the queries
        3. **Run SQL Queries**: Execute SQL commands and display on the results screen
- **Result Screen**:
    - **Download & Copy**: Easily download or copy results to the clipboard.
    - **Loading State**: Shows "Generating results" when fetching results.
    - **Lazy Loading**: Optimized loading for large data componen

## **Technologies Used**
- **Frontend**: React with Vite
- **Styling**: TailwindCSS
- **State Management**: Context API
- **Deployment**: Netlify

## **Plugins**
- **React Split**: For resizable, adjustable split panels.
- **React Window**: Efficient rendering for large lists. (Experimented with this , but could not better the styling correct )
- **React Suspense**: Enables lazy loading for components and data.

Usage
Enter your SQL query and click "Run".
View results in the output panel.
Use buttons to copy or download results as needed.

Deployed at: https://67b63bce7eb67abc79465a35--papaya-baklava-596918.netlify.app/