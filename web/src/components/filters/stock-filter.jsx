
function StockFilter({ onFilter, selected }) {


    const handleChange = (event) => {
        onFilter(event.target.checked);
    };

    return (
        <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 px-2 py-3 flow-root font-medium text-gray-900">
                Out of stock
            </h3>
            <div className="flex mt-4 gap-3">
                    <div className="group mt-1 grid size-4 grid-cols-1">
                        <input
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-dark-green checked:bg-dark-green indeterminate:border-dark-green indeterminate:bg-dark-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-green disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            type="checkbox"
                            role="switch"
                            checked={selected}
                            onChange={handleChange}
                        />
                        <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        >
                            <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                            <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                            />
                        </svg>
                    </div>
                <label
                    htmlFor="flexSwitchCheckDefault"
                    className="min-w-0 flex-1 text-gray-500"
                >
                    Fuera de stock
                </label>
            </div>
        </div>
    );
}

export default StockFilter;
