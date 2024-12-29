import React, { useState } from 'react';
import './AddPhoto.scss'; // Импортируем стили
import { AddPhotoPlus } from '../../../utils/icons';

const AddPhoto = ({ placeholder, onPhotoChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            onPhotoChange(placeholder, file); // Передаем выбранное фото в родительский компонент
        }
    };

    return (
        <div className="add_photo">
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                id="file-input"
            />
            <label htmlFor="file-input" className="upload_button">
                <img src={AddPhotoPlus} alt="pl" />
                <p className='text_mln_f16_l16'>{selectedFile ? 'photo uploaded' : 'add photo'}</p>
                <p className='text_mln_f12_l12'>{placeholder}</p>
            </label>
        </div>
    );
};

export default AddPhoto;