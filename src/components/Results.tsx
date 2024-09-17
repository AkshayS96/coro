import { KBarResults, useMatches } from "kbar";


export default function Results() {
  const { results } = useMatches();

  return (
    <div
      style={{
        borderTop: '1px solid black',
        // padding: '10px',
      }}
    >
      <KBarResults
        items={results}
        onRender={({ item, active }) => {
          console.log(item);

          if (typeof item === 'string') {
            return (
              <div style={{
                fontSize: '14px',
                paddingLeft: 10
              }}>{item}</div>
            );
          }

          return (<div
            style={{
              display: "flex",
              flexDirection: "row",
              background: active ? "#eee" : "transparent",
              marginLeft: 10,
              marginRight: 10,
              alignItems: 'flex-start',
              columnGap: 10,
            }}
          >
            <div><b>{item.name}</b></div>
            <div>{item.subtitle}</div>
          </div>);
        }}
      />
    </div>
  );
}