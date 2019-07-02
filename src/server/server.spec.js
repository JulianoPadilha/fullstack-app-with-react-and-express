import { addNewTask, updateTask } from "./server";

const myFunc = async () => {
  await addNewTask({
    name: "My task",
    id: "12345"
  });

  await updateTask({
    name: "My task - updated",
    id: "12345"
  })
}; 

myFunc();


