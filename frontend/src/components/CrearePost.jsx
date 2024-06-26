import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { IoMdImage } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { MdAddLink } from "react-icons/md";
import Login from './Login';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constants';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';


function CrearePost() {
    const dispatch = useDispatch()
    const [description, setDescription] = useState("")
    const { user } = useSelector(store => store.user)
    const {isActive} =useSelector(store=>store.tweet)

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description, id: user?._id },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },

                    withCredentials: true
                })
            dispatch(getRefresh())
            if (res.data.success) {
                toast.success(res.data.msg)
            }

        } catch (error) {
            toast.error(error.response.data.msg)
            console.log(error);
        }
        setDescription("")
    }

    const forYouHandler = () => {
        try {
            dispatch(getIsActive(true))

        } catch (error) {
            console.log(error);
        }
    }

    const followingHandler = () => {
        try {
            dispatch(getIsActive(false))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-[100%]'>
            <div >
                <div className='flex items-center justify-evenly border-b border-gray-140'>
                    <div onClick={forYouHandler} className={`${isActive?"border-b-4 border-blue-600":"null"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg '>For You</h1>
                        </div>
                    <div onClick={followingHandler} className={`${isActive?"null":"border-b-4 border-blue-600"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                        </div>
                </div>
            </div>
            <div className=''>
                <div className='flex items-center p-4'>
                    <div>
                        <Avatar src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEBIVFRUWFxIVFRUQFRUVFRUVFhYWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0fHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAECB//EAEoQAAEDAQUFBAUICAQEBwAAAAEAAgMRBAUSITEGQVFhcRMigZEUMqGxwQcjcoKS0eHwFSQzQlJissI0Q3TxY3PD0hc1U4OTorP/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAJBEAAgIDAAICAwEBAQAAAAAAAAECEQMhMRJBBDITIlEUcWH/2gAMAwEAAhEDEQA/APKDCarsQlEI46uorD2AINGsECArr0coqC1SNpwQo1gf0YrPRSjQIW8YRo3kBfRHLfoTkca4cFIzMgAZmgHUreIPIAehOWxYHJvmsgaXNGdMq8SNVqWy4QAdaA+YBQWxm6FQXc5dtutx3JmjjrU5AAVJOlFCy2Cvd6D70JfqGCcivNcFY4Q0AuLZQ41p3sVW5/Wp0og5ux3BNU95NY1rcsQccPLJuZ+yFXbaWHIuz3Uyr1J9yRS/pSUP4Lf6Nctfo1yb22auEEYSdCcgcq0roHaZLoXRKSQ1uIt1A1/PIplOP9EcJr0Jpu8ozd9h7qKyXW8Nq5v56q1YLNQJmk+Cpv2I17xOa7JDqycCny2WIF2YUIu9vBdEPjqSshP5FOhJwy8Cs7GVPAsLeC2LG3gn/wAyE/0sR/RZVnoUn5qnn0UcAs9GHAI/54g/0yEf9Hyfmqw3c/Up49HHBQ2mAYTks/jxoy+RID3TZclcdZVaumLVXHwrhaO2wR6MsRTsViFGsFwwd9c3gyiIQtzVK9DmFbLpEcbtlEBWGNyWom1UrRQrnj0saZAaKPBUow8ANQwHNUhtgnpE8UeSIXPZcUjSdA+P+qvwVeNmSK3baA1tKZ4mkdKEEfnirTVIhB3Ilkj77hvDnedVk7cTq5aAeACFWu2Oa4uNc9/3odaLz4Hy3KKk0XcbLN+WoCkbSKZF1N/L2IPJbKGvkOCpWm1GpJKibKAKnfpVL0otI3Ja3YiSiV3SF2dDTyr+eKGROB4V5mquwPw5gkniTks0ZPY0x2vE4sLhhc0AAitHD1aAbutPBGomhmEyPd2veADa1HEOO/TKvNefRW4MOp54DhPQHMoxFfry/GMPQgOpXXDiGvOnFSlB+i0Zr2O4u8yDEXFzjWjIxjeeZp6o5ladd8kf7RhGmtPbTelyy37LjxBzq5E+rWu7ojg2hc8hsrauOjjWpHln7UYTceizx+XAfaou8o+yTU+743NBoWk0q5xGXINHXehct1ubiOobv5cSNy9HBnhJUeZnwTi7BHZrOzVotWsC6jkK3ZrRjVrAtFiwCoWKC1N7pVmd1FVmkq0oMZGrmZqrsjFBcrdVekbmvNo9KyrgW1NhW1qCCoRmhl7ahFoRmhd6DvBUzfUli+xHAw0UrG1I6q9ZYxhWWWy1d4rmUTostixlzChlos1HAJ2gsncQC8Ie+unHCo2c+Sdyorujo1c2VpViRhNAFzbonQtEpHdFcXJpp3vA0ryKaW0LHRFb6UIcEl29pBNCmm9rSHNNCSSTShyAGpy1JSy6FzzkD4qD6dEQc41KsOjqdNBQIoy7a0G9FLDdQFQ8d6tAN53g9KKUppF443IV2wGuXl+CsCFx0PgdEyXlcYDcVNx/BC5bK5o/NVlkTC8TQOEVM30y4FdR2j+AeGWlVzLDXU+xcxw0NWnPn8E/SfGGbJeWBwLgC0aa16A6jzTHBfLXAGKrADo4h5BzqQXCo/BAoYhK1uIZjIkUr+I+NdKpkhuMtaKEjJpOjST3iKcdRmKrmnKJ1Qiw7YTiaJXOrpXTEftH3f7njahLE4OBo5pDQGgGg5jXQoNdsbmgh+bQMhrUc+WYVqcOawOBJJpX+UGu7TwS4rlNJBzUoNvgDMa1gVpza5rWBfQWfN0VsC4kFFcwKC0RZImAt4OyyQaSYgFGZ4jXNB7zZRSm9Fsa9Bq4c21V+QZqhs4O4iLxmuNcOx9I6LS7osRoFgmDVCb2d3giNkf3ihV9euEc31ExfYIXc6oomG77MMilGxWiiabstlQFDHJezomm1oaoACEBviAB1VfZacIJQu1y9ocl1RkvE5pR/ctXbZQ4hFL2s7WwkkDu0OelKgOryoTVQXQzDqjMkHaMc05ggjzCK4JLTPELxb2bnCM0BJ7poQBXQcN6hbO+la0rwFFBecTmTPjcKYXOaK8AaBW2R6V6rjlo9CKsZNk7AXuxPzpxTv6E0kEgVG/fTghGz8QbG2m9MUQquKT8md0VSB16WEGM0CUbTZqgim7RejGHJK193YYz2rBVo9YDUDiOIH3orRnsQX2cONN4VSWzOByOaYL3sZYe2i7zNXU3c+ipWmEuHaMHUbwrqRCUCxsvPH2jRLXMihJoK8Oa9XtVidQPbhLSBWp7rm6EfZ9x4ryLZ+9mQuw2iISQuIJBaC5tN7a68xvC9q2efC6IejuDojmADUDiM82nXI8FDLHdlMctG7BYmECgLm6d5xyw5UIGu7zUlusgoaNoCCMuJ09oHmubDE6OVzQ2jDVw6/D8Vu97XhFP3i12EDTIgE9QCUseo0t2LMkVDQrnCrD881GvfhJuOz5/JFKToiwqG0ZK2qVv0T2JQItLggV7x5FWbRbML6FR2+VpapzlaZaEaaCezo7iISaqhs96iISarmjw6ZdOVixYiABWRnfQ++m94IxBqht7NzWz/UGL7A2J4COXbPSnUJcdkVcs8xDmgbyFyJHTY5W2fuFR2CYb1FKPm6lDWz0rmnjKjSjsaReIbRNNzTBzKrx62W8jeid2bYGMYcyumM0+nNOD9A/5SbEY7WT/ABNDvaR8EIY6tOtEzbRtNrYJB6zQacxrRLULPV6ge1QzKmdHx3aoeo7U9jGCKPG4jQnCBz/Bcm9reB3Y4/z4ojHZyIxhGdAglrs9qcD3sNCKBoxYhvq7QbsqDfmuOB3T/ppu0F5B3ebHThQe+qbLstj5WVe2h3hKF3XU8EYnuLycwaUw9RnWqdbpiwVAzG6qMnujQWrFjaAtiqWChNatGQNeSTYXzYjhiFNQASmzbKxP7ZlcmvBIPGhpvQ8XS7sgWuPad6oGEtoR3SD6xIOdMgeSeKpE5O2AbTZ5HEF0WHM5jw1HDJegbGPww+s4SMJHAbiBiHGmpy461Qu4Nk7TaGSODsWEOwh5wku3Abj0I8RqH7ZTZ7s4T2jMDwcJOWY45H80U8rtUhoUtsKWC1FzQaGu8H3oPe1sDZAXHRsoIGuZb3eR19it2u0hpIY4FwyOWdKihFK78qJP2utJa8YnguNCdAabq040KlDbKS0rK9ovijiK1p7VB+nOaBS2iudVA6bmvSWaZwP48Bhff3NULXf2WqEOk5obbpUVmmxXggjLwtpc6oUbbY4ilVSc+q6i1WcmBRR6Js36gRGTVDtm/wBmOiISHNPHhOXTS2tVWJhQTBqh16uzRCHVBL7k7yGZXEGJ/sVnOFVas9MTTzCDulXcNo7w6rlUDqsdrTP82Ql+0uIFVemnPZoRapu7mjFBkyjI8krTVWdaFjbTmqUJY93f+z8FUdcTmxtc2rswQTqeIyVm7DWIJhuORhGCQ0pWgOQNee4hH5CfgmhfiyX5Gn7CtgbVo6BW3WRp1Cr2UgGgNQDkRmiMZXnnqFP0JozAA6LuAUNFamGRQmz3tEHuYDiLRnkQPA0oUTDZtJdEdpsWlXRsxxkaggVcOhA9yQrLZ8qEVT3cl+wua2zSSsZLI12Ble9hcDhJG6uorqlu57OHGis2nE54xaky5s3YjUhhwg6038k2NutgYcVTq7JzqHwryUN22EMzAzRKaSjHE5UBSJLdmnJ3o8/uSzOZ6VaZCCGtLgNRRtXAE7swSvGL0vGWSV73uqXOJNV7T8pl9xQWPsIiO1nbgDWkd2OtXyOpxphHU814RaX0OafDClYuXJbOvSHcVnbO4rmAVVrsFaiNlYyu4qN9TqrZhUb46LGtFXCpGBcuctsdmiBNHoezn7MdFbnOaqbO/sx0Vm0K0eEJdNY1i5WJhQfCc0Avv1kWs0veIQ29mVK2Thsf2AXZkrcGRUherl0XeZXHkotF7D1nALR0Qy+oQ1hRmOzdmWgoVtL6hpxU10Z8FBy7ghJIXfYFW7KyisIOd2mkQVkPqwqCwZxhWmxEtIaCTwAqfIK0Wc0lsv7ET4oXN3ske3zo/wDuTZC/JIWxrZYZ5WSxyNZIA5pexwbibUHMjeD/APVOkT6FeXnVTZ6/x3eNF9xQ+02NoaaDX38VXtj7RrG9oH0auHjVUXPtAFRI0nqWnxGaRKzpjFsddlLuiwOc6MOmJzkcKvLSAAMR0GVEYju6MOyYAd2EUXmd12O1yzYY7U2J4BOLE81puyIR/tLzjlZ6Q9j2tyBiHr13u3+YT8WyOSDUuj/gQzaV+Gyy8wB5uARIOyCV9uLaAxkIOZON30RUDzJP2VaCuSOOTpM8ev1lZCUo3qyhTfe/7RK96xElWJJkVhV4yBDWZBcOlKwQg6QKGWQKkZCuS8rWjUzreumDNZEpQEGFIftnv2Y6K1MVUuA/NjorMxVY8Iy6aW1xVYmFA1lb3iorexXIdVI+AOWnG1QISp2JUw7x6pg2XtQZWqtG6GlSw3U0aJPxsp+VG7dbccrQNwKH38agDijMF2AHEstV3BxFdyX8bsP5VQs2azBX7ouR9pnZBCO845k6NbvceSOWG5Q9waMuJ4DenG7CywN7WKOuEEkb35aErODDGaJmXDYrGMDz28owghx0J4sGQHVWheGfzDWRgaYGt9uSSrJZrTM90kjgwyOLjWpdUmum5NUEAijoM6CpJ1J3kreL9hTXo3arY9wc2SZzq07gAwjMHMnP3KkHUOfgUMu+0YquJzechyrl7EWLKhcXyPto7fj/AFJgCVVnuvFnUjoaKWzWmnddl8VZktQopI6LAkdgcx4dGXYgdRVP1xxyOAMoz5oHcdvAmDdap0EgAqE6SIzkyVx3JbvWRj5nxPDX0IFHHC4d0eq9F7FaMbq7l59fNtw3laGPy7zcFdHAsbp4p1L2iXhbplPaDY1znF1kdicK1hlo2T6h0d7F5zb2Fri17S1zTRzXChB4EHRe/OgEsIfWj4xQka4dxPGiAbQ3LBa20tPdkGTLTGKu5NkH7zeufBXU37IOH8PDJiq5TlfuxU1nPfAcw+pKzNjvHceRQg3KVWrEugCVoo8bkK4NylbxD5oFQqYFX/0QQs/RjkPE3mhouB3cHRXJih1zAtbQq7K5VXCL6ZVYuKrEQFGLVWmlVItVaanJkoK7aVGF2FjFmJy5e5V5bWxgq9wHXXyQu0bQMHqAnmcggGmx02bZm88gPP8A2RO9R807kKpD2S2q/WOzloGSUa06Uf8Au15HTrReiTRhzXNO8Eeam3svCP6g664sgdVavV9IXn+V3uVTZmWsOE+swlp6jJZtVJhs0n0He4oSYYIT9mZDJIX17rO4wbq/vH4J3jSXsPFSEdU5xFebk3I9LGqijiSMHVU7TYajukjoSiLguJdMktDlTZuxETglxyTvftt7KDLVxDQlPZ8HtqlWr7vFr5g2uTMq7q70xNjNs76gXm+2d4MN6TQPNKmExu4P7NgcK8ahMtr2rbDHhg7z6UxEd1vOm8ryO/Hl8peSS6uKp1Lq1rXqqY1onPtnuOy9oOEYxrVp4Hcql/2L0d4IzikrQHdxafgrFh9Vu7IIzelnE1nIdlhGMHoM/YSujHyjnyPdilc9swSdhKBJZ5sqOzwk7vxQ/bHY02cdtAS6Imha71mV0z3t3KA2gMkDdWk5civVH2dssWCQVD20PiEyuLEdSR4IYncFE6NyPXhZjFK+J2rHFvWmh8RQqqaKxAEmJy12JRV7VmFYxQs7CFNIpy1QTImI6rFxVbWMVotVZaqFmlq5XcVBU6JxCQvAFTkOaDW++zpHkOO89OCq3neRfk3Jvv5lCyUrYyj/AEkknJNSa9VE5yxaIQHOXaL0vYTajtWtgnd880ZE/wCY0b/pAa+a81oog44gWkgg1BbkQRoQfApJKx4uj3WxQCOZ4GknfHXRw9x8VR2yP6vL9B/uK5uC8TJDZe1PzskT5AchUxuDHZc8QU19xdpFI0jVrgR4IdQeC7sUPmgE0tCW9moDHRp8OYTW1lQuHJHZ3Y5JxIqqKZ+WRU8kZoh87CplSpJaXNJwupXgoHOVqKwkmtFs2M1Tpk2gRajkg0dj7SQDdqegzKZbbZDorliuvA019Z2vIbh8SrQVkpuhvsFS1g5N9ym2pvAtYIGHvOALyNw3DxXF1SNaA92jW16kDIIUwGR5e7VxJK6IR9nLN+indt0Y5Gl2eY86r0uWQMb3iAABUnduS1YHxwtdaJnNZFECXOeaALzLaDb59utDoo6ss9KQgijnyhzXRyv3jvNGFu6ueeivbGWkNNutcdvc+0MyaBhaHDC8YCQcXPehdsuORubO9y38VDf14Nspwspgk7WWn8WJ7at6d94Vy4do2NjawuxMMzIWk5kAsxNrxpkEFKS2gNJ6YGzBoRQjcVtegXjckU4OWF4rRw48+ISNb7E+F5ZIKEeRHEclWM1IlKDiViqs5VlxVSU5pxThYsosWMC7KO8or7tlAIxqcz04KxC8CpO6qXbZPjeXcdOm5GTNBWcFy2FE4+8KRTspR0sXJK2EUzM1VRQtyHE/HNdWg0aUX2UsgktdnjOhkaT0Z3z7GrMyCO21sfZprHDC4tfZYGCv8783gjf6o8007MbVx2xoZIBHPT1a91/0Cd/8uvVef7Vz9rbrQ/8A4jmjowBn9qGRZAEbqHLUHcRzStUMmey2aEMcY3DLVvEInHER6pqOeRS1cl4C12drv8+GjX55uoPWB/mGfUEJgsEpI1r1+8IyipqzQm4Oiy52WeXVcxRAqap4HwzXDnnn4tP3LneA6Pzs7wAaKCWLoOq6q4/vO8Gn40W2wcQfrH4BGOD+ged+kRRwitRmeJ3dOHVRTZ5N36n7vvVuZmXw3eSxkOXNW8Uloj5NvZI39mByHsU92xEgAanIKMN7tPBQm3skFosllk/WBDI3FGc4XuY4Riv8ZcNBp1Qv9aNW7PPflN2nFol9Egd+rwONSNJphUOfza3MDxPBJ1kmLJA5uraOHUHJQWemEU0oFs+sOhTpUhLthe8bxMrIQ4kmNr2mvORzh7D7Fl12kNLmuPdoXCh0ewVBHWlPFDarlrlq0A9z2RvYy2dsjtS5oPiA0+0hFbzsTLSwtyxtqGk8SKt04ghee7C301r2WMihY57TT94uq5x6hwp4BG7qvkttEtTp2opuHo9oofOO0N+yFzvT0WW1sAWuF0bnMeKOaaEHiqTk3/KDZu8yZoycMLjzHq18K+STcS6IytWQkqdHSxcVW0wot2q09wgb8kJJUsxyVd5oR4pG7KJUjch9496lqonLtpQCbrmpAoGlStRRmR2o5AcSPenP5MrNithfujie7xdRo9hckqU1cPE+z8V6F8ndIrPbLSdzQ37DHPP9QWZkI1ofiklf/FJK7ze4qGHQfnkuoRRorrTNcQnI8ifvRYEOXyf2kNlc0mmNmXMgnJPll7slNzsx8favI7rko9pBoWuBGfH8QvXptYnc6eYr8EsNMMgu1bouWldVTGMoo65rb3qKErGN2ldtFcq0XMwqFFLamxMdLIcLGDE860aNTQckJPQUti38ou1TIWvs9nxCQxubK9lWmOQta5rWu40eCSOFNa0R/kvvT0e3Mzo2QdmeGKuJhP1hT6yg2qt/pDxaMx2ze0cCAAHYi0io1phAQGyuIcS00IoQeBGYPmlitBb2Mu2l2ejW6eNooxzu1i/5cvfaByBLm/UQGQ5j87k8fKQ4TQ2C2D/MjfG7wwSs/wD1kHgkSY6dQmT0K1snqpLG2sjBxewebgFDVXLljLrRC0b5YvY8H4I+gF+4LXgvIO42mQfalI+KNWe2/rUzRnU3g4j6DI2keJjPklCafs5nv3meQim5rZCXEcyaDzU1zXj8+6d5IHzrndJX0eB/8h8lOr3/AOFLrR7Rbm9vDPDqY4osP0xjcPEgN+0vOGSIxHfpisfbV+ctNtjrya1zXOb4MYGHxQm/YxFaZo9A17qdD3m+whDHrQuT+mYltU+3HFYrEhYmdmoZtOma6cc1hSFThrslICqrDSrVOw5LGOmqVpUAUm5YBGDV/h7z+Ce4pRDcprraHyCnEF3Z/wBLCUhQHMnoE2bTy0sd3R7jE6Tx/LyiYXtyhg9Z3UH2KWuShj9Y9AiAu2Q0J5Aewr2V5xMjcP4mHzaR8V4xZ/3vor2axs+ZiB/4fwSLoz4FWlY9y4WnFOYjkcpIVASpmFZgRI5LXygWjDd8oH7+Fn2ntB9lUxuKTflDdWysHGQA+DilYTzO0OoxjeAO7+JxI38OnioLNq5dSGpJ/PALmDeiuAfRyv2XFc9hr+7M9o6Bso/tCT5zl5Jpv52G67Az+J8snh3v+8JVm9U+KyMyRpRrY9tbbADueXfZaXfBAYnZI5sq4tlklaK9jBaJKdIyMvEhB8Zl1C9PaMb3O3VdSnAuJ95J8V1E/Km7KvhoqceisiTDSmv5zRRmM191rYrGNY2sc8D/ANW0PDj4gYfNM/ynWTBaWSDSWMV+kzun2YUmbItMlsie81OIOqf5Rl7h5L0f5TG4rLG8axyYT0e0/EBTupJDVaZ51iPFYq3aLFYlRRW1pYCkKEEwrnvClhdUKOQ0K6iOoWMdxruQ5LiNZKVgGrPp4n7kz7V/4e7f9Mf+mlmDQJl2o/w12/8AIk98awQCSomet4D4rtxyUR9YHkiAuwHuyHg0cePJe2yGjYxxLR7CfgvEGj5uTmWjTpv3L2e0PyhH8w8gx34JV0Z8CQctOKjBXWJMAi3qZhVd5UjCiwIle5Je3Tv1bpKfayqcHOSjtg2tnnHB0bvMEJHwY8yd+fgoojr4qV+4c1Ew5O6uTiDNtiaRWCL+CzNPi/D/ANqXTomLbsUls/D0WD+5LhOSxiKznJMWzYBbaP5YLQ76vYvBFepafBLdnKY9nB83bHcLLMPtCgSS4NHoqRnjuU0TKmpULArTCmQBi2Kb+tNJOTQSU9X3aGy2G0tcRVxrGN7nxjtMI50YV53s7acDn01LQG9a6JquK0B95Q2dxBZC2YO4OlkbSTrQEN+qeKlNftY8HqhGxLE8f+H7OfmVip+SInhIQSsCxYsEhtGiyHU9AsWLAJmLmdbWLGMh9UdAmXan/D3b/p3f9NYsWCL79FG/UdD7wsWIgLMfq/XavZp9YfH+lYsQXQvhfC2sWIozI3rbFixF8AunT0s7RepN/wCz/U5YsSS4N7PKW6jxUUeh6uWLEwo0bd+vZv8ATQ/FLR0W1iICvZ0xXF/h7d/p/wC8LFiSXBl0V2Kw1YsTIAW2a/xEf04/6wi+w3/mf15v61ixJL3/AMGR60sWLFzFj//Z" size="50" round={true} />
                    </div>
                    <input value={description} onChange={(e) => { setDescription(e.target.value) }} className='w-full outline-none border-none text-xl ml-2' type="text" placeholder='What is happening?!' />
                </div>
                <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                    <div className='flex items-center justify-between'>
                        <div className='pl-2'>
                            <IoMdImage size={"20px"} />
                        </div>
                        <div className='pl-2'>
                            <MdOutlineEmojiEmotions size={"20px"} />
                        </div>
                        <div className='pl-2'><MdAddLink size={"20px"} /></div>
                    </div>
                    <button onClick={submitHandler} className='bg-[#1098f0] px-4 py-1 text-lg text-white text border-none rounded-full'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CrearePost
