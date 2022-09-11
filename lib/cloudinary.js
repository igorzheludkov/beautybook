export default function Cloudinary({uploadHandler, multiple, picArrayLength}) {

  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_APISECRET,
        uploadPreset: 'profile_uploads',
        sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
        showAdvancedOptions: true,
        cropping: false,
        croppingCoordinatesMode: 'custom',
        multiple: true,
        defaultSource: 'local',
        maxFiles: 8,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
          fonts: { default: { active: true } },
        },
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
            uploadHandler(result.info)
          console.log('Done! Here is the image info: ', result.info)
        }
      }
    )
    widget.open()
  }

  return <button className="uploadButton" onClick={showWidget}>Завантажити фото</button>
}
