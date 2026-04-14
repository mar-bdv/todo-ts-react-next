
"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeModal } from "../../store/uiSlice";
import { updateTask } from "../../store/tasksSlice";
import { useState } from "react";
import { Task } from "../../types/task";

const COLORS = [
    { id: "red", hex: "#FF9797", border: "#FF3636", name: "Красный" },
    { id: "orange", hex: "#FFC891", border: "#FF9E3D", name: "Оранжевый" },
    { id: "green", hex: "#B3E898", border: "#80E04D", name: "Зеленый" },
    { id: "light_blue", hex: "#B7E7FF", border: "#7ED4FF", name: "Голубой" },
    { id: "blue", hex: "#A7A8FF", border: "#4245FE", name: "Синий" },
    { id: "purple", hex: "#D59DFF", border: "#B14CFF", name: "Фиолетовый" },
];

type PropsForm = {
    modalTask: Task;
    onSave: (payload: Task) => void;
    onCancel: () => void;
};

// дочерняя форма: инициализирует state при монтировании (useState с init)
function EditTaskForm({ modalTask, onSave, onCancel }: PropsForm) {
    const [title, setTitle] = useState(modalTask.title);
    const [description, setDescription] = useState<string | null>(modalTask.description ?? null);
    const [selectedColor, setSelectedColor] = useState<string | null>(modalTask.color ?? null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(modalTask.category ?? null);
    const [error, setError] = useState("");

    const handleSave = () => {
        if (!title.trim()) {
            setError("Название задачи не может быть пустым");
            return;
        }

        const colorObj = COLORS.find(c => c.id === selectedColor);
        onSave({
            ...modalTask,
            title: title.trim(),
            description: description?.trim() || null,
            category: selectedCategory || null,
            color: colorObj?.hex || null,
            colorBorder: colorObj?.border || null,
        });
    };

    return (
        <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <div className="modal_container-content">
            <h2 className="modal_heading">Редактировать Задачу</h2>

            {error && <p style={{ color: "#F44336", fontSize: "12px", marginBottom: "10px" }}>{error}</p>}

            <div className="modal_block">
            <label className="modal_label">Название задачи *</label>
            <input
                className="modal_input"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError(""); }}
                placeholder="Введите название задачи..."
            />
            </div>

            <div className="modal_block">
                <label className="modal_label">Описание задачи</label>
                <textarea
                    className="modal_textarea"
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value || null)}
                    maxLength={70}
                    placeholder="Введите описание задачи..."
                />
            </div>

            <div className="modal_container-category">
                <div className="modal_block-category">
                    <label className="modal_label">Выбрать категорию</label>
                    <select
                    className="modal_select"
                    value={selectedCategory ?? ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    >
                        <option value="">Нет категории</option>
                        <option value="важно">Важно</option>
                        <option value="срочно">Срочно</option>
                        <option value="работа">Работа</option>
                        <option value="спорт">Спорт</option>
                        <option value="Хобби">Хобби</option>
                    </select>
                </div>

                <div className="modal_block-category">
                    <label className="modal_label">Выбрать цвет категории</label>
                    <div className="color_picker">
                        {COLORS.map((c) => (
                            <button
                                key={c.id}
                                className={`color_circle ${selectedColor === c.id ? "active" : ""}`}
                                style={{ backgroundColor: c.border }}
                                onClick={() => setSelectedColor(c.id)}
                                title={c.name}
                                aria-label={c.name}
                            />
                        ))}
                    </div>
                    {selectedColor && <p className="color_selected">Выбран цвет: {COLORS.find(x => x.id === selectedColor)?.name}</p>}
                </div>
            </div>

            <div className="modal_container-btns">
                <div className="btn_block">
                    <button className="btn_modal btn_modal-cancel" onClick={onCancel}>Отменить</button>
                </div>
                <div className="btn_block">
                    <button className="btn_modal btn_modal-save" onClick={handleSave}>Сохранить</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default function EditTaskModal() {
    const dispatch = useDispatch();
    const { isModalOpen, modalTask } = useSelector((state: RootState) => state.ui);

    const handleSave = (updatedTask: Task) => {
        dispatch(updateTask(updatedTask));
        dispatch(closeModal());
    };

    const handleCancel = () => {
        dispatch(closeModal());
    };

    if (!isModalOpen || !modalTask) return null;

    return (
        <div className="modal_backdrop" onClick={handleCancel}>
            <EditTaskForm key={modalTask.id} modalTask={modalTask} onSave={handleSave} onCancel={handleCancel} />
        </div>
    );
}