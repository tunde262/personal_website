import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';

import { db } from '../../utils/firebase-config';
import { collection, getDocs, doc} from 'firebase/firestore';

// Light Box
import { SRLWrapper } from "simple-react-lightbox";

// Icons = material UI
import CloseIcon from '@material-ui/icons/Close';


const ImageBlock = ({ 
    filesToUploadNum,
    detailPost, 
    dimensions,
    removeImg, 
    admin, 
    post: { 
        urls 
    }, 
    nav,
    setHasImg,
    setCheckHasImg,
    checkHasImg
}) => {

    const [postImgs, setPostImgs] = useState(null);
    const [gotPostImgs, setGotPostImgs] = useState(false);
    
    // Trigger if post HAS imgs - for font size reasons
    useEffect(() => {
        handleHasImgState();
    }, [postImgs]);


    async function getPostImgs() {
        const docRef = doc(db, 'posts', detailPost._id)
        const colRef = collection(docRef, "img_gallery")
        // console.log('FETCHING IMGS')
        try {
            // console.log('GALLERY DATA')
            const galleryData = await getDocs(colRef);
            const galleryList = galleryData.docs.map((doc) => ({...doc.data(), id: doc.id}));
            // console.log(galleryList);
            setPostImgs(galleryList)
            setGotPostImgs(true);
        } catch (err) {
            console.log('ERROR:');
            console.log(err);
        }
    }

    if(!gotPostImgs && detailPost) {
        getPostImgs()

        setGotPostImgs(true);
    }

    // const getPostImgs = async () => {
    //     console.log('FETCHING IMGS')
    //     try {
    //         console.log('GALLERY DATA')
    //         const galleryData = await getDocs(colRef);
    //         const galleryList = galleryData.docs.map((doc) => ({...doc.data(), id: doc.id}));
    //         console.log(galleryList);
    //         setPostImgs(galleryList)
    //         setGotPostImgs(true);
    //     } catch (err) {
    //         console.log('ERROR:');
    //         console.log(err);
    //     }
    // }

    let imgInfo = [];

    if(admin) {
        for (var i = 0; i < urls.length; i++) { 
            if(dimensions && dimensions.length > 0 && dimensions[i] && dimensions[i].width && dimensions[i].height) {
                imgInfo.push({
                    img_path: urls[i],
                    width: dimensions[i].width,
                    height: dimensions[i].height
                })
            } else {
                imgInfo.push({
                    img_path: urls[i],
                    width: 0,
                    height: 0
                })
            }
        }
    } else {
        if(postImgs && postImgs.length > 0) {
            postImgs.map(image => {
                imgInfo.push({
                    img_path: image.img_path,
                    width: image.img_width,
                    height: image.img_height
                })
            })
        } else {
            imgInfo = null;
        }
    }

    // For font size reasons
    const handleHasImgState = () => {
        if(postImgs && postImgs.length > 0 && checkHasImg != null && !checkHasImg) {
            setHasImg(true)
            setCheckHasImg(true);
            // console.log('CHECK HAS IMAGE')
        }
    }

    let imageContent = (<></>);
    if(imgInfo) {
        if(imgInfo.length >= 4) {
            imageContent = (
                <div className={admin ? "tweetBox__imgContainer" : "post__imgContainer"}>
                    <div className={admin ? "tweetBox__imgRow" : "post__imgRow"}>
                        <div className={admin ? "tweetBox__imgColumn active" : "post__imgColumn"}>
                            <div className="tweetBox__img--image">
                                <a href={imgInfo[0].img_path}>
                                    <img className={imgInfo[0].width > imgInfo[0].height ? "fullHeight" : "fullWidth"} src={imgInfo[0].img_path} alt="img" />
                                </a>
                            </div>
                            {admin && (
                                <div onClick={() => removeImg(0)} className="tweetBox__imgBtn">
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                        <div className={admin ? "tweetBox__imgColumn active" : "post__imgColumn"}>
                            <div className="tweetBox__img--image">
                                <a href={imgInfo[1].img_path}>
                                    <img className={imgInfo[1].width > imgInfo[1].height ? "fullHeight" : "fullWidth"} src={imgInfo[1].img_path} alt="img" />
                                </a>
                            </div>
                            {admin && (
                                <div onClick={() => removeImg(1)} className="tweetBox__imgBtn">
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={admin ? "tweetBox__imgRow" : "post__imgRow"}>
                        <div className={admin ? "tweetBox__imgColumn active" : "post__imgColumn"}>
                            <div className="tweetBox__img--image">
                                <a href={imgInfo[2].img_path}>
                                    <img className={imgInfo[2].width > imgInfo[2].height ? "fullHeight" : "fullWidth"} src={imgInfo[2].img_path} alt="img" />
                                </a>
                            </div>
                            {admin && (
                                <div onClick={() => removeImg(2)} className="tweetBox__imgBtn">
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                        <div className={admin ? "tweetBox__imgColumn active" : "post__imgColumn"}>
                            <div className="tweetBox__img--image">
                                <a href={imgInfo[3].img_path}>
                                    <img className={imgInfo[3].width > imgInfo[3].height ? "fullHeight" : "fullWidth"} src={imgInfo[3].img_path} alt="img" />
                                </a>
                            </div>
                            {admin && (
                                <div onClick={() => removeImg(3)} className="tweetBox__imgBtn">
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        } else if(imgInfo.length == 3) {
            imageContent = (
                <div className={admin ? "tweetBox__imgContainer" : "post__imgContainer"}>
                    <div className={admin ? "tweetBox__imgRow active" : "post__imgRow"}>
                        <div className="tweetBox__img--image">
                            <a href={imgInfo[0].img_path}>
                                <img className={imgInfo[0].width > imgInfo[0].height ? "fullHeight" : "fullWidth"} src={imgInfo[0].img_path} alt="img" />
                            </a>
                        </div>
                        {admin && (
                            <div onClick={() => removeImg(0)} className="tweetBox__imgBtn">
                                <CloseIcon />
                            </div>
                        )}
                    </div>
                    <div className={admin ? "tweetBox__imgRow" : "post__imgRow"}>
                        <div className={admin ? "tweetBox__imgColumn active" : "post__imgColumn"}>
                            <div className="tweetBox__img--image">
                                <a href={imgInfo[1].img_path}>
                                    <img className={imgInfo[1].width > imgInfo[1].height ? "fullHeight" : "fullWidth"} src={imgInfo[1].img_path} alt="img" />
                                </a>
                            </div>
                            {admin && (
                                <div onClick={() => removeImg(1)} className="tweetBox__imgBtn">
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                        <div className={admin ? "tweetBox__imgColumn active" : "post__imgColumn"}>
                            <div className="tweetBox__img--image">
                                <a href={imgInfo[2].img_path}>
                                    <img className={imgInfo[2].width > imgInfo[2].height ? "fullHeight" : "fullWidth"} src={imgInfo[2].img_path} alt="img" />
                                </a>
                            </div>
                            {admin && (
                                <div onClick={() => removeImg(2)} className="tweetBox__imgBtn">
                                    <CloseIcon />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        } else if(imgInfo.length == 2) {
            imageContent = (
                <div className={admin ? "tweetBox__imgContainer" : "post__imgContainer"}>
                    <div className={admin ? "tweetBox__imgRow active" : "post__imgRow"}>
                        <div className="tweetBox__img--image">
                            <a href={imgInfo[0].img_path}>
                                <img className={imgInfo[0].width > imgInfo[0].height ? "fullHeight" : "fullWidth"} src={imgInfo[0].img_path} alt="img" />
                            </a>
                        </div>
                        {admin && (
                            <div onClick={() => removeImg(0)} className="tweetBox__imgBtn">
                                <CloseIcon />
                            </div>
                        )}
                    </div>
                    <div className={admin ? "tweetBox__imgRow active" : "post__imgRow"}>
                        <div className="tweetBox__img--image">
                            <a href={imgInfo[1].img_path}>
                                <img className={imgInfo[1].width > imgInfo[1].height ? "fullHeight" : "fullWidth"} src={imgInfo[1].img_path} alt="img" />
                            </a>
                        </div>
                        {admin && (
                            <div onClick={() => removeImg(1)} className="tweetBox__imgBtn">
                                <CloseIcon />
                            </div>
                        )}
                    </div>
                </div>
            )
        } else if(imgInfo.length == 1) {
            imageContent = (
                <div className={admin ? "tweetBox__imgContainer active one_image" : "post__imgContainer one_image"}>
                    <div className="tweetBox__img--image">
                        <a href={imgInfo[0].img_path}>
                            <img className="fullWidth" src={imgInfo[0].img_path} alt="img" />
                        </a>
                    </div>
                    {admin && (
                        <div onClick={() => removeImg(0)} className="tweetBox__imgBtn">
                            <CloseIcon />
                        </div>
                    )}
                </div>
            )
        }
    }

    const options = {
        caption: {
            showCaption: false
          },
          buttons: {
            showAutoplayButton: false,
            showFullscreenButton: false,
            showThumbnailsButton: false,
        }
    }

    const optionsNoThumbnail = {
        caption: {
            showCaption: false
          },
        thumbnails: {
            showThumbnails: false
        },
        buttons: {
            showAutoplayButton: false,
            showFullscreenButton: false,
            showNextButton: false,
            showPrevButton: false,
            showThumbnailsButton: false,
        }
    }

    // const images = [];

    // if(detailPost && detailPost.img_gallery) {
    //     detailPost.img_gallery.map(imageObj => {
    //         images.push({
    //             src: `https://oubuysell.com/api/users/image/${imageObj.img_name}`,
    //             thumbnail: `https://oubuysell.com/api/users/image/${imageObj.img_name}`,
    //             caption: '',
    //             width: 'auto',
    //             height: 'auto'
    //         })
    //     })
    // }

    return (
        <Fragment>
            <SRLWrapper options={nav.page === 'home' || nav.page === 'profile' ? optionsNoThumbnail : options}>
                {admin ? (
                    filesToUploadNum > 0 ? (
                        urls.length > 0 ? (
                            imageContent
                        ) : (
                            filesToUploadNum >= 4 ? (
                                <div className="tweetBox__imgContainer">
                                    <div className="tweetBox__imgRow">
                                        <div className="tweetBox__imgColumn active">
                                            <div className="tweetBox__img--image">
                                                <Spinner />
                                            </div>
                                        </div>
                                        <div className="tweetBox__imgColumn active">
                                            <div className="tweetBox__img--image">
                                                <Spinner />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tweetBox__imgRow">
                                        <div className="tweetBox__imgColumn active">
                                            <div className="tweetBox__img--image">
                                                <Spinner />
                                            </div>
                                        </div>
                                        <div className="tweetBox__imgColumn active">
                                            <div className="tweetBox__img--image">
                                                <Spinner />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                filesToUploadNum == 3 ? (
                                    <div className="tweetBox__imgContainer">
                                        <div className="tweetBox__imgRow active">
                                            <div className="tweetBox__img--image">
                                                <Spinner />
                                            </div>
                                        </div>
                                        <div className="tweetBox__imgRow">
                                            <div className="tweetBox__imgColumn active">
                                                <div className="tweetBox__img--image">
                                                    <Spinner />
                                                </div>
                                            </div>
                                            <div className="tweetBox__imgColumn active">
                                                <div className="tweetBox__img--image">
                                                    <Spinner />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    filesToUploadNum == 2 ? (
                                        <div className="tweetBox__imgContainer">
                                            <div className="tweetBox__imgRow active">
                                                <div className="tweetBox__img--image">
                                                    <Spinner />
                                                </div>
                                            </div>
                                            <div className="tweetBox__imgRow active">
                                                <div className="tweetBox__img--image">
                                                    <Spinner />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        filesToUploadNum == 1 && (
                                            <div className={admin ? "tweetBox__imgContainer active one_image" : "post__imgContainer one_image"}>
                                                <div className="tweetBox__img--image">
                                                    <Spinner />
                                                </div>
                                            </div>
                                        )
                                    )
                                )
                            )
                        )
                    ) : (
                    <></>
                    )
                ) : imageContent
                }
            </SRLWrapper>
        </Fragment>
    )
}


ImageBlock.propTypes = {
    post: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post,
    nav: state.nav
})

export default connect(mapStateToProps, null)(ImageBlock);

