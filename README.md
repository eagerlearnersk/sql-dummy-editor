# ** SQL RUNNER **
### header H3
 web-based application capable of running SQL queries 

## **Features**

- **Split View**: Adjustable query and result panels for better UX.
- **Query Screen**
        - **Create More button** - lets user have a text input where user can enter query
        - **Save button** - to commit to the queries
        - **Run SQL Queries**: Execute SQL commands and display on the results screen
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
- **React Window**: Efficient rendering for large lists. (Experimented with this , but could not better the styling correct  - removed as the code is not super efficient)
- **React Suspense**: Enables lazy loading for components and data.

## **Usage**
- Enter your SQL query and click "Run".
- View results in the output panel.
- Use buttons to copy or download results as needed.


## **Page Load Time**
- **First Contentful Paint (FCP)**: 0.3 seconds
- **Largest Contentful Paint (LCP)**: 0.3 seconds

## ** How Performance is measured **
- **Lighthouse Performance Analysis**  
  - Generated Lighthouse reports for both deployed and local environments.  
  - Evaluated how resources were being utilized and identified opportunities for optimization.  
  - **Optimizations Implemented:**  
    - Minified CSS and JavaScript.  
    - Lazy-loaded resources to reduce initial page load time.  
    - Removed unused CSS and JS.  

- **React Profiler**  
  - Identified unnecessary re-renders.  
  - **Optimizations Implemented:**  
    - Used `useCallback` and `useMemo` to memoize functions and values.  
    - Used `memo` to prevent child components from re-rendering unnecessarily.  

- **Lazy Loading with React.Suspense**  
  - Lazy-loaded components using `React.Suspense` to improve performance and reduce the initial load time.  

Deployed at: https://67b75b9fc1f0a60f460cd093--papaya-baklava-596918.netlify.app/