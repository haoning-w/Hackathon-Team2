function FormRow({ label, error, children }) {
  return (
    <div className="flex py-5 gap-10 items-center h-16">
      {label && (
        <label className="font-medium w-1/4" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="w-1/4 text-lg text-[#b91c1c]">{error}</span>}
    </div>
  );
}

export default FormRow;
