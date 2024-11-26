import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";

type ActivityListProps = {
    activities: Activity[];
};

export default function ActivityList({ activities }: ActivityListProps) {
    const categoryName = useMemo(
        () => (category: Activity["category"]) =>
            categories.map((cat) => (cat.id === category ? cat.name : "")),
        [activities]
    );
    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>

            {activities.map((activity) => (
                <div
                    key={activity.id}
                    className="px-5 bg-white mt-5 flex justify-between"
                >
                    <div className="space-y-2 relative">
                        <p>{activity.category}</p>
                        <p className="text-2xl font-bold pt-5">
                            {activity.name}
                        </p>
                        <p className="text-4xl font-black text-lime-500">
                            {activity.calories} <span>Calorias</span>
                        </p>
                    </div>
                    <div className=""></div>
                </div>
            ))}
        </>
    );
}
