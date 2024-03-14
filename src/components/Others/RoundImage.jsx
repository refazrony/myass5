function RoundImage({ author }) {
    return (
        <>
            {

                author.avatar ? (
                    <img
                        className="max-w-full rounded-full"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${author?.avatar}`}
                        alt={author.firstName[0].toUpperCase()}
                    />
                ) : (
                    <span className="">{author.firstName[0].toUpperCase()}</span>
                )
            }
        </>
    );
}

export default RoundImage;