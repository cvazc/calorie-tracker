import { useState, ChangeEvent } from "react";
import { categories } from "../data/categories";

export default function Form() {
    const [activity, setActivity] = useState({
        category: 1,
        name: "",
        calories: 0,
    });

    const handleChange = (
        event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
        setActivity({
            ...activity,
            [event.target.id]: event.target.value,
        });
    };

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="category">
                    Categoria:
                </label>
                <select
                    className="border border-slate-300 p-2 rounded-lgw-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="name">
                    Actividad:
                </label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="calories">
                    Calorias:
                </label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value="Guardar Comida o Guardar Ejercicio"
            />
        </form>
    );
}
