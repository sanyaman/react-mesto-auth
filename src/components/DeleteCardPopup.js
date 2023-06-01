import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isLoading }) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(true);
    }

    return (
        <PopupWithForm
            name='delete'
            title='Вы уверены?'
            isOpen={isOpen ? "popup_opened" : ""}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <button
                    name="saveBtn"
                    type="submit"
                    className="popup__sumbit popup__sumbit-confirmation">
                    {isLoading && isOpen ? "Запуск Адронного Коллайдера..." : "Да"}
                </button>
            </>
        </PopupWithForm>);
}

export default DeleteCardPopup;