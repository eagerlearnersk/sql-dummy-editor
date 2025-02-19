// import { FixedSizeList } from "react-window";
// import { useQueryContext } from "../Context/QueryContext";
// import './Results.css'; // Import your CSS file

// const ROW_HEIGHT = 40;

// const Results = () => {
//   const { queries, results } = useQueryContext();

//   return (
//     <section>
//       <h3>Query Results:</h3>
//       <section className="result-body">
//         {queries.map((query, index) => {
//           const data = results[query];

//           return (
//             <div key={`${query}-${index}`} className="m-20">
//               {data && data.length > 0 && <h4>{query}</h4>}
//               {data && data.length > 0 && (
//                 <div className="table-container">
//                   <table className="results-table">
//                     <thead>
//                       <tr>
//                         {Object.keys(data[0]).map((key) => (
//                           <th key={key}>{key}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                   </table>

//                   {/* Virtualized Table Body (Correct Approach) */}
//                   <div className="table-body-wrapper"> {/* Wrapper for scrolling */}
//                     <FixedSizeList
//                       height={500}
//                       width={"100%"}
//                       itemSize={ROW_HEIGHT}
//                       itemCount={data.length}
//                       className="react-window-list"
//                     >
//                       {({ index, style }) => {
//                         const row = data[index];
//                         return (
//                           <div style={style} key={row.id || index} className="table-row"> {/* Div for row */}
//                             {Object.values(row).map((value, cellIndex) => (
//                               <div key={cellIndex} className="table-cell"> {/* Div for cell */}
//                                 {value}
//                               </div>
//                             ))}
//                           </div>
//                         );
//                       }}
//                     </FixedSizeList>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </section>
//     </section>
//   );
// };

// export default Results;