import axios from 'axios';
import { Todo } from '../types/todo';
import { Project } from '../types/project';
import { Product } from '../types/product';

const BASE_URL = '/api';
const axiosIntance = axios.create({ baseURL: BASE_URL });

export const getTodoIds = async () => {
  return (await axiosIntance.get<Todo[]>('todos')).data.map((todo) => todo.id);
};

export const getTodo = async (id: number) => {
  return (await axiosIntance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  await axiosIntance.post<Todo>('todos', data);
};

export const updateTodo = async (data: Todo) => {
  await axiosIntance.put<Todo>(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosIntance.delete<Todo>(`todos/${id}`);
};

export const getProjects = async (page = 1) => {
  return (await axiosIntance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosIntance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosIntance.get<Product>(`products/${id}`)).data;
};
