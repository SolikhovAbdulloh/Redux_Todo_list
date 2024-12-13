import { useForm } from "react-hook-form";
import { deleteFuc, getData, updateTodo } from "./redux/todo";
import { useDispatch, useSelector, useStore } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";

function App() {
  const { data } = useSelector((state) => state.todoList);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const submit = (e) => {
    dispatch(getData(e));
  };

  const [selectTodo, setSelect] = useState(null);

  const [newtodo, setnewtodo] = useState("");

  const [search, setSearch] = useState("");

  const FuctionSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterData = data.filter((todo) =>
    todo.todo.toLowerCase().includes(search.toLowerCase())
  );

  const saveFuc = () => {
    if(selectTodo){
      dispatch(updateTodo({ id: selectTodo.id, todo: newtodo }));
      setSelect(null)
      setnewtodo("")
    }
  };

  return (
    <div className="w-[90%]">
      <h1 className="text-center text-[20px] font-bold text-[green]">
        Todo-list
      </h1>
      <div className=" flex w-full gap-2 items-center justify-center mt-5">
        <label>Search</label>

        <input
          className="bg-[#e6e6e6] text-black px-3 w-[90vh]  rounded-2xl h-[50px]"
          value={search}
          onChange={FuctionSearch}
        />
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex   items-center m-auto w-[60%] mt-10">
          <input
            className="bg-[#d2d0d0] text-black m-auto w-[70%] h-[50px] p-3 rounded-xl"
            {...register("todo", { required: true })}
          />
          <button className="w-[80px] bg-[#00ddff] h-[50px]  rounded-3xl flex items-center justify-center">
                  Add
            </button>
        </div>
        {errors.todo && (
          <p className="font-normal m-auto flex justify-center items-center text-[18px] text-red-500">
            Iltimos so'z kiriting
          </p>
        )}
      </form>

      {filterData.map((e) => (
        <div className="flex items-center justify-between m-auto mt-4 w-[30%]">
          <p
            key={e.id}
            className="text-base font-medium flex justify-center items-center"
          >
            {e.todo}
          </p>
          <button
            onClick={() => dispatch(deleteFuc(e.id))}
            className="w-[80px]   h-[40px] bg-[#a73d3d4e] rounded-3xl flex items-center justify-center"
          >
            <MdDelete />
          </button>
          <button
            onClick={() => {
              setSelect(e), setnewtodo(e.todo);
            }}
            className="edit-button"
          >
            <MdModeEdit/>
          </button>
          {selectTodo && selectTodo.id === e.id && (
            <div>
              <input
                placeholder="Tahrir qilish"
                onChange={(e) => setnewtodo(e.target.value)}
                value={newtodo}
              />
              <button onClick={saveFuc}>Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
