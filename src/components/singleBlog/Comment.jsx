function Comment({ data }) {
    return (
        <div className="flex items-start space-x-4 my-8">
            <div className="avater-img bg-orange-600 text-white">
                {

                    data?.author?.avatar ? (
                        <img
                            className="max-w-full rounded-full"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${data?.author?.avatar}`}
                            alt={data?.author?.avatar}
                        />
                    ) : (
                        <span className="">{data?.author?.firstName[0].toUpperCase()}</span>
                    )
                }
            </div>
            <div className="w-full">
                <h5 className="text-slate -500 font-bold">{data?.author?.firstName + " " + data?.author?.lastName}</h5>
                <p className="text-slate-300">
                    {data.content}
                </p>
            </div>
        </div>
    );
}

export default Comment;