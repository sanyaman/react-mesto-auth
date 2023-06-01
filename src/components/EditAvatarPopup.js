import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const linkRef = useRef();

    useEffect(() => {
        linkRef.current.value = "";
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Обновить аватар'
            isOpen={isOpen ? "popup_opened" : ""}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <figcaption>
                <fieldset className="popup__field popup__field-profile">
                    <input ref={linkRef}
                        type="url" name="link" id="input-avatarlink"
                        placeholder="Ссылка на Картинку" required
                        className="popup__fill popup__fill_value_profile" />
                    <span className="popup__fill-error" id="input-avatarlink-error"></span>
                </fieldset>
                <button
                    name="saveBtn" type="submit"
                    className='popup__sumbit popup__sumbit-profile'   >
                    Добавить
                </button>
            </figcaption>
        </PopupWithForm>);
}

export default EditAvatarPopup;


