export default function TaskFilter({ filter, setFilter }) {
    return (
        <div className="task-filter">
        <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search tasks..."
        />
        </div>
    );
    }