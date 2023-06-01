function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {

  return (
    <div className={`popup popup_${name} ${isOpen} `} aria-label={name}>
      <div className={`popup__container popup__container-${name} ${isOpen}`} >
        <button
          onClick={onClose}
          className='popup__close'
          type="button"
        />
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form-${name}`}
          name={`popupForm${name}`}
        >
          <h2 className="popup__profile-name">{title}</h2>
          {children}
        </form>
      </div>
    </div>);
}

export default PopupWithForm;
