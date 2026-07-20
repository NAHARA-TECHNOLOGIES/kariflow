import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Features from '../components/Features';
import VisualGallery from '../components/VisualGallery';
import StorySlider from '../components/StorySider';
import MeasurementDemo from '../components/MeasurementDemo';
import TaskTracker from '../components/TaskTracker';
import DayInLife from '../components/DayInLife';
import Steps from '../components/Steps';
import SuccessMap from '../components/SuccessMap';
import GlobalReach from '../components/GlobalReach';
import ROICalculator from '../components/RIOCalculator';
import Comparison from '../components/Comparison';
import Integrations from '../components/Integration';
import FounderMission from '../components/FoundersMission';
import FutureVision from '../components/FutureVision';
import VideoTestimonials from '../components/VideoTestimonial';
import Testimonials from '../components/Testimonals';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import BlogSection from '../components/BlogSection';
import DownloadApp from '../components/DawnLoad';
import WaitlistForm from '../components/WaitListForm';

// 🎯 FIXED: Removed duplicate <SEO /> markup component & client side context hooks
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Partners />
      <Features />
      <VisualGallery />
      <StorySlider />
      <MeasurementDemo />
      <TaskTracker />
      <DayInLife />
      <Steps />
      <SuccessMap />
      <GlobalReach />
      <ROICalculator />
      <Comparison />
      <Integrations />
      <FounderMission />
      <FutureVision />
      <VideoTestimonials />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BlogSection />
      <DownloadApp />
      <WaitlistForm />
    </>
  );
}