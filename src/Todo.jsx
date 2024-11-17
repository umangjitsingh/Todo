import React, {useState, useEffect} from 'react'
import {GiCheckMark} from "react-icons/gi";
import {IoTrashBin} from "react-icons/io5";

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);
    const [dateTime, setDateTime] = useState("")

    const handleChange = (e) => {
        setInputValue(e.target.value)
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) return;
        setTask((prev) => {
            if (task.includes(inputValue)) return [...prev];
            return [...prev, inputValue];
        })
        setInputValue("")
    }

    // Date-Time Functionality
    const DateAndTime = () => {
        const dateNow = new Date().toLocaleDateString();
        const timeNow = new Date().toLocaleTimeString();
        setDateTime(dateNow + " " + timeNow)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            DateAndTime();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])


    const handleRemoveTask = () => {
       setTask([])
    }

    const handleDeleteTodo = (indValue) => {
        task.splice(indValue,1)
    }

    return (
        <section className="items-center flex flex-col min-h-svh pt-14 bg-zinc-900 text-white ">

            <header className=" items-center flex flex-col justify-around min-h-8 ">
                <h1 className="text-6xl font-extrabold pb-2 font-[display] tracking-wider">Todo List</h1>
            </header>

            <h1 className="text-xl pb-6 font-semibold font-serif">{dateTime}</h1>

            <section className="flex flex-col gap-16 justify-center  m-2">
                <form className="flex " onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            className="p-4 pl-8 sm:text-xl h-full text-gray-900 outline-0 tracking-widest w-full max-w-2xl hover:cursor-text placeholder-zinc-900 rounded-l-3xl"
                            type="text"
                            autoComplete="off"
                            value={inputValue}
                            onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <button className="p-3 h-full text-sm sm:text-lg bg-blue-400  rounded-r-3xl w-full  max-w-2xl"
                                type="submit">Add Task
                        </button>
                    </div>
                </form>

                <ul className=" capitalize ">
                    {
                        task.map((individualTask, index) => <li key={index}
                                                                className="text-lg py-2 flex justify-between text-yellow-100">
                            <span className="w-2/3 ">{individualTask}</span>
                            <div className=" flex justify-evenly">
                                <button className="text-3xl px-2 text-green-600"><GiCheckMark/></button>
                                <button className="text-3xl pl-10 pr-3 text-red-600 " onClick={()=>handleDeleteTodo(index)}><IoTrashBin/></button>
                            </div>
                        </li>)
                    }
                </ul>

            </section>

            <section>
                <button
                    className="text-xl font-semibold font-sans bg-red-500 hover:bg-fusia-600 text-white mt-6 hover:text-2xl p-4 hover:font-bold  rounded-lg"
                    onClick={handleRemoveTask}>
                    Clear All
                </button>
            </section>

        </section>
    )
}
export default Todo
