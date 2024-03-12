import { useState } from 'react';
import EditIcon from '../../assets/icons/edit.svg';
import CheckIcon from "../../assets/icons/check.svg";
import { useProfile } from '../../Hooks/useProfile';
import useAxiosCall from '../../Hooks/useAxiosCall';
import { actions } from '../../actions';
import { notifySucccess } from '../../utls/myToast';

function Bio({ userBio, isUserSelf }) {

    const { state, dispatch } = useProfile();
    const { api } = useAxiosCall();

    const [editMode, setEditMode] = useState(false);
    const [bio, setBio] = useState(state?.user?.bio);


    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        const formData = new FormData();
        formData.append("firstName", state?.user?.firstName);
        formData.append("lastName", state?.user?.lastName);
        formData.append("bio", bio);
        formData.append('avatar', state?.user?.avatar)

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`, formData
            );

            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: actions.profile.USER_DATA_UPDATE_BIO,
                    data: response.data.user.bio,
                });
            }
            setEditMode(false);
            notifySucccess("profile has been updated successfully");
        } catch (err) {

            console.log(err.message);
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message,
            });
        }
    };

    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!isUserSelf ? (!editMode ? (<p className="leading-[188%] text-gray-400 lg:text-lg">
                    {state?.user?.bio}
                </p>) : (<textarea
                    className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
                    value={bio}
                    rows={4}
                    cols={55}
                    onChange={(e) => setBio(e.target.value)}
                />)) : (<p className="leading-[188%] text-gray-400 lg:text-lg">
                    {userBio}
                </p>)}
            </div>
            {/* Edit Bio button. The Above bio will be editable when clicking on the button */}



            {!isUserSelf && (!editMode ? (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={() => setEditMode(true)}
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
            ) : (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={handleBioEdit}
                >
                    <img src={CheckIcon} alt="Check" />
                </button>
            ))}

        </div>
    );
}

export default Bio;