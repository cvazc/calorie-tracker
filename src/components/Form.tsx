import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

type FromProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
};

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
};

export default function Form({ dispatch, state }: FromProps) {
    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(
                (stateActivity) => stateActivity.id === state.activeId
            )[0];
            
            setActivity(selectActivity);
        }
    }, [state.activeId]);

    const handleChange = (
        event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
        const isNumberField = ["category", "calories"].includes(
            event.target.id
        );

        setActivity({
            ...activity,
            [event.target.id]: isNumberField
                ? +event.target.value
                : event.target.value,
        });
    };

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== "" && calories > 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({ type: "save-activity", payload: { newActivity: activity } });
        setActivity({ ...initialState, id: uuidv4() });
    };

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
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
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={
                    activity.category === 1
                        ? "Guardar Comida"
                        : "Guardar Ejercicio"
                }
                disabled={!isValidActivity()}
            />
        </form>
    );
}
