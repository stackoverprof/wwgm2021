import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import UploadMCE from '@core/utils/uploadMCE'

const InputMCE = ({value, onChange}) => {
    return (
        <Editor
            apiKey = 'oknir2yye4thse3gsqfj4ghubcgo51astnzvozba42kqh0pv'
            init = {{
                menubar: false,
                min_height: 400,
                width: 800,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount image '
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | image ',
                images_upload_handler: function (blobInfo, success, failure) {
                    const image = blobInfo.blob()
                    UploadMCE(image, success, failure)
                },
                branding: false,
            }}
            value={value}
            onEditorChange={onChange}
        />
    )
}

export default InputMCE
