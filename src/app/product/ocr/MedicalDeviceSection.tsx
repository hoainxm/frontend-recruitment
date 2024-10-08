import CButton from '@base/button'
import { CSwiper } from '@base/swiper'
import { CZoomVideo } from '@base/zoom-video'
import Effective from '@images/Effective.svg'
import HealthDeviceCapture from '@images/HealthDeviceCapture.png'
import MedicalDeviceBackground from '@images/MedicalDeviceBackground.png'
import Ripple02 from '@images/Ripple02.svg'
import Stopwatch from '@images/Stopwatch.svg'
import React, { FC } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { SectionLayout } from '../../../common/ui/layout/section-layout'
import { getYoutubeLink } from '../../../common/utils/common'
import { HD_CHARACTER_RECOGNITION, HD_FIELDS_EXTRACTION, YOUTUBE_VIDEO_ID } from '../../../common/utils/constants'
import { ButtonSize, PageURL, ScopeKey, ScopeValue } from '../../../models/enum'
import { ProductSpecs } from './components/ProductSpecs'
import { MEDICAL_PARTNERS, MEDICAL_SPECS } from './constant'
import style from './productOcr.module.scss'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '@models/rootReducer'

interface Props {
  sectionId: string
}

const FirstSlide = () => {
  const { t } = useTranslation()

  return (
    <div className={style.healthDeviceSlide}>
      <div className={style.partnerGrid}>
        {MEDICAL_PARTNERS.map((partner, index) => (
          <div key={index} className={style.partnerFrame}>
            <Image src={partner} />
          </div>
        ))}
      </div>
      <div className={style.indicators}>
        {MEDICAL_SPECS.map((spec, index) => (
          <div key={index} className={style.indicator}>
            <Image src={spec.image} />
            <div className={style.text}>{t(spec.text)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SecondSlide = () => {
  return (
    <div className={style.videoSlide}>
      <CZoomVideo
        imageCapture={HealthDeviceCapture}
        src={getYoutubeLink(YOUTUBE_VIDEO_ID.MEDICAL_DEVICE)}
      />
    </div>
  )
}

const ThirdSlide = () => {
  const { t } = useTranslation()

  return (
    <div className={style.specSlide}>
      <Image src={Ripple02} className={style.secondRipple} />
      <div className={style.specAccuracy}>
        <ProductSpecs
          title={t("accuracy")}
          icon={Effective}
          isBorderContent
          contentClassName='text-nowrap'
          content={
            <>
              <h4>{t("characterRecognition")}: {HD_CHARACTER_RECOGNITION}</h4>
              <h4>{t("fieldsExtraction")}: {HD_FIELDS_EXTRACTION}</h4>
            </>
          }
        />
      </div>
      <div className={style.specSpeed}>
        <ProductSpecs
          title={t("highlight")}
          icon={Stopwatch}
          isReverse
          isBorderContent
          contentClassName={style.maxWidth360}
          content={
            <h4>{t("optimizedHardware")}</h4>
          }
        />
      </div>
    </div>
  )
}

export const MedicalDeviceSection: FC<Props> = (props) => {
  const { sectionId } = props
  const { t } = useTranslation()

  const history = useHistory()
  const userInfo = useSelector((state: RootState) => state.main.userInfo)
  const isAuthenticated = localStorage.getItem(ScopeKey.IS_AUTHENTICATED);

  const checkAuthenticatedNavigate = () => {
    history.push(
      isAuthenticated === ScopeValue.TRUE && userInfo ? PageURL.OCR_MEDICAL_DEVICE : PageURL.LOGIN,
      { path: PageURL.OCR_MEDICAL_DEVICE }
    )
  }

  return (
    <SectionLayout id={sectionId} backgroundImage={MedicalDeviceBackground}>
      <Row>
        <Col xs={6} className='text-left'>
          <h1 className={style.title}>{t("product.ocr.medicalDevice")}</h1>
          <h4 className={style.subTitle}>{t("product.ocr.medicalDevice.description")}</h4>
          <CButton 
            className={style.tryNow} 
            label={t("btn.tryNow")}
            size={ButtonSize.LARGE}
            onClick={checkAuthenticatedNavigate}
          />
        </Col>
        <Col xs={6}>
          <CSwiper
            isAutoPlay
            isLoop
            className={style.swiperContainer}
            spaceBetween={8}
            listSlide={[FirstSlide, SecondSlide , ThirdSlide]}
          />
        </Col>
      </Row>
    </SectionLayout>
  )
}