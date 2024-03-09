import { useRef } from 'react';
import edit from '../../assets/icons/edit.svg';
//import useAxiosCall from '../../Hooks/useAxiosCall';





function ProfileImage() {
    //const { state, dispatch } = useProfile();
    const profileImageRef = useRef();
    // const { api } = useAxiosCall();



    const handleSelectImage = (e) => {
        e.preventDefault();
        //profileImageRef.current.addEventListener("change", updateImageDisplay);
        profileImageRef.current.click();
    }

    // const updateImageDisplay = async () => {
    //     try {
    //         const formData = new FormData();
    //         for (const file of profileImageRef.current.files) {
    //             formData.append("avatar", file);
    //         }

    //         const response = await api.post(
    //             `http://localhost:3000/profile/avatar`,
    //             formData
    //         );
    //         console.log(response)
    //         // if (response.status === 200) {
    //         //     dispatch({
    //         //         type: actions.profile.IMAGE_UPDATED,
    //         //         data: response.data,
    //         //     });
    //         // }
    //     } catch (error) {
    //         console.log(error)
    //         // dispatch({
    //         //     type: actions.profile.DATA_FETCH_ERROR,
    //         //     error: error.message,
    //         // });
    //     }
    // }
    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                {/* User's first name initial */}
                <span className="">S</span>
            </div>
            <button
                onClick={handleSelectImage}
                className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
                <img src={edit} alt="Edit" />
            </button>
            <input
                ref={profileImageRef}
                type="file"
                name="photo"
                id="photo"
                className="hidden"
            />
        </div>
    );
}

export default ProfileImage;