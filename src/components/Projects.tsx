import { useState } from 'react';
import { useProjects } from '../services/queries';

export default function Projects() {
  const [page, setPage] = useState(1);
  const { data, isError, error, isPending, isFetching, isPlaceholderData } =
    useProjects(page);
  return (
    <div>
      {isPending ? (
        <div>loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((p) => p + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching && <span>Loading...</span>}
      <br />
      <br />
    </div>
  );
}
