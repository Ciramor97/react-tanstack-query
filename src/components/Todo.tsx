import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutations';
import { useTodoIds, useTodos } from '../services/queries';
import { Todo } from '../types/todo';
import { useForm } from 'react-hook-form';

export default function TodoComponent() {
  const { isPending, isError, data } = useTodoIds();
  const todosQueries = useTodos(data);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit = (data: Todo) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) updateTodoMutation.mutate({ ...data, checked: true });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>There is an error ...</span>;
  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo: </h4>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create'}
        />
      </form>

      <ul>
        {todosQueries?.map(({ data }) => (
          <li key={data?.id}>
            <h1>Id:{data?.id}</h1>
            <span>
              <strong>Title : </strong> {data?.title}{' '}
              <strong>Description : </strong>
              {data?.description}{' '}
            </span>
            <button
              onClick={() => handleMarkAsDoneSubmit(data)}
              disabled={data?.checked}
            >
              {data?.checked ? 'Done' : 'Mark as done'}
            </button>

            <button
              style={{ marginLeft: 10 }}
              onClick={() => handleDeleteTodo(data?.id!)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
