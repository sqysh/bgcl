import { PageField } from '@/types/common.types'

export const aboutContent: PageField[] = [
  {
    id: 'modal_heading',
    type: 'text',
    label: 'Modal Heading',
    value: 'Looking to attend our 9th Annual Gala? ',
    section: 'modal'
  },
  {
    id: 'modal_subheading',
    type: 'textarea',
    label: 'Modal Subheading',
    value: 'Purchase your tickets & sponsorships before they are sold-out! ',
    section: 'modal'
  },
  {
    id: 'modal_button1Text',
    type: 'text',
    label: 'Button 1 Text',
    value: 'Purchase ',
    section: 'modal'
  },
  {
    id: 'modal_button1Link',
    type: 'text',
    label: 'Button 1 Link',
    value: 'https://www.bgcl.org/events/cmpr70dxu0000lt7prbidiy07',
    section: 'modal'
  },
  {
    id: 'modal_button2Text',
    type: 'text',
    label: 'Button 2 Text',
    value: 'Maybe Later ',
    section: 'modal'
  },
  {
    id: 'modal_toggleModal',
    type: 'boolean',
    label: 'Show Modal',
    value: 'true',
    section: 'modal'
  },
  {
    id: 'mission_heading',
    type: 'text',
    label: 'Mission Heading',
    value: 'Our Mission',
    section: 'mission'
  },
  {
    id: 'mission_subheading',
    type: 'text',
    label: 'Mission Subheading',
    value: 'Our purpose',
    section: 'mission'
  },
  {
    id: 'mission_bodyText',
    type: 'textarea',
    label: 'Mission Body Text',
    value:
      'To inspire and enable all young people, especially those that need us the most, to realize their full potential as productive responsible and caring citizens!',
    section: 'mission'
  },
  {
    id: 'mission_button1Text',
    type: 'text',
    label: 'Button 1 Text',
    value: 'Volunteer',
    section: 'mission'
  },
  {
    id: 'mission_button2Text',
    type: 'text',
    label: 'Button 2 Text',
    value: 'Donate',
    section: 'mission'
  },
  {
    id: 'mission_button2Link',
    type: 'text',
    label: 'Button 2 Link',
    value: '/donate',
    section: 'mission'
  },
  {
    id: 'facility_heading1',
    type: 'text',
    label: 'Facility Heading 1',
    value: 'Building',
    section: 'facility'
  },
  {
    id: 'facility_heading2',
    type: 'text',
    label: 'Facility Heading 2',
    value: 'the Future',
    section: 'facility'
  },
  {
    id: 'facility_subheading',
    type: 'text',
    label: 'Facility Subheading',
    value: 'Our Transformation',
    section: 'facility'
  },
  {
    id: 'facility_paragraph1',
    type: 'textarea',
    label: 'Facility Paragraph 1',
    value:
      'In 2020, The Boys & Girls Club of Lynn underwent a $6.4 million dollar renovation. With the support of our many donors, we were able to complete a big portion of our building renovation. We are proud to offer the following new additions to our facility: Dance Studio, STEAM Lab, Planet Fitness Gym, Teen Center, Gaming Room, as well as a Technology Center.',
    section: 'facility'
  },
  {
    id: 'facility_paragraph2',
    type: 'textarea',
    label: 'Facility Paragraph 2',
    value:
      'The club also has a new and improved lobby area, Board Room, multiple office space for our staff, bathrooms, registration areas and more! Our Kids Club and Afterschool program spaces have been fully renovated as well! At our Kids Club, we offer 3 dedicated classrooms, a huge open play and activity area along with a tower garden for our little members to explore and delve into the art of gardening.',
    section: 'facility'
  },
  {
    id: 'facility_paragraph3',
    type: 'textarea',
    label: 'Facility Paragraph 3',
    value:
      'Our newly enhanced After School Drop In Center is equipped with a dedicated Teen area as well as the aforementioned STEAM Lab, Gym, Dance Studio, Gaming area and also a Tower Garden for our older members to test out their gardening skills!',
    section: 'facility'
  },
  {
    id: 'programs_heading1',
    type: 'text',
    label: 'Programs Heading 1',
    value: 'Building',
    section: 'programs'
  },
  {
    id: 'programs_heading2',
    type: 'text',
    label: 'Programs Heading 2',
    value: 'Skills for Tomorrow',
    section: 'programs'
  },
  {
    id: 'programs_subheading',
    type: 'text',
    label: 'Programs Subheading',
    value: 'Our programs',
    section: 'programs'
  },
  {
    id: 'facility_paragraph4',
    type: 'textarea',
    label: 'Facility Paragraph 4',
    value:
      'Presently, we in our Phase 2 renovations which will begin with opening a Preschool Center located at 35 Franklin Street. In 2027, we are looking forward to offering more classrooms for our Licensed Child Care program, a new Gym, new Pool, Teen Wing, Games Room, Commercial Kitchen, and more!',
    section: 'facility'
  }
]

export const awardWinnersContent: PageField[] = [
  {
    id: 'awards_eyebrow',
    type: 'text',
    label: 'Awards Eyebrow',
    value: 'News, Updates & Recognition',
    section: 'awards'
  },
  {
    id: 'awards_heading',
    type: 'text',
    label: 'Awards Heading',
    value: 'Award Winners',
    section: 'awards'
  },
  {
    id: 'awards_subheading',
    type: 'textarea',
    label: 'Awards Subheading',
    value:
      "Stay informed about what's happening at the Boys & Girls Club of Lynn. Read our latest news, celebrate our honorees, and discover the impact we're making in our community.",
    section: 'awards'
  },
  {
    id: 'awards_honorees_heading',
    type: 'text',
    label: 'Honorees Heading',
    value: '2026 Award Winners',
    section: 'awards'
  },
  {
    id: 'awards_honorees_subheading',
    type: 'textarea',
    label: 'Honorees Subheading',
    value: "Celebrating this year's award-winning honorees and their outstanding contributions.",
    section: 'awards'
  },
  {
    id: 'awards_fame_heading',
    type: 'text',
    label: 'Hall of Fame Heading',
    value: 'Hall of Fame Inductees',
    section: 'awards'
  },
  {
    id: 'awards_fame_subheading',
    type: 'textarea',
    label: 'Hall of Fame Subheading',
    value: "Honoring the distinguished individuals who have shaped our organization's legacy.",
    section: 'awards'
  },
  {
    id: 'awards_helping_heading',
    type: 'text',
    label: 'Helping Hands Heading',
    value: 'Helping Hands Business of the Year',
    section: 'awards'
  },
  {
    id: 'awards_helping_subheading',
    type: 'textarea',
    label: 'Helping Hands Subheading',
    value: 'Celebrating local businesses that have generously supported our mission and community.',
    section: 'awards'
  },
  {
    id: 'awards_commitment_heading',
    type: 'text',
    label: 'Commitment Heading',
    value: 'Commitment to Youth Recipients',
    section: 'awards'
  },
  {
    id: 'awards_commitment_subheading',
    type: 'textarea',
    label: 'Commitment Subheading',
    value: 'Recognizing individuals who have demonstrated exceptional commitment to youth development.',
    section: 'awards'
  },
  {
    id: 'awards_cta_heading',
    type: 'text',
    label: 'CTA Heading',
    value: 'Be Part of Our Story',
    section: 'awards'
  },
  {
    id: 'awards_cta_subheading',
    type: 'textarea',
    label: 'CTA Subheading',
    value:
      "Whether through volunteering, donating, or spreading the word, there are many ways to support our mission and become part of our community's success stories.",
    section: 'awards'
  }
]

export const campaignsContent: PageField[] = [
  {
    id: 'campaigns_eyebrow',
    type: 'text',
    label: 'Campaigns Eyebrow',
    value: 'Support Our Cause',
    section: 'campaigns'
  },
  {
    id: 'campaigns_heading',
    type: 'text',
    label: 'Campaigns Heading',
    value: 'Active Campaigns',
    section: 'campaigns'
  },
  {
    id: 'campaigns_subheading',
    type: 'textarea',
    label: 'Campaigns Subheading',
    value: 'Every dollar raised directly supports Boys & Girls Club of Lynn programs that empower youth in our community.',
    section: 'campaigns'
  }
]

export const capitalContent: PageField[] = [
  {
    id: 'campaign_eyebrow',
    type: 'text',
    label: 'Campaign Eyebrow',
    value: 'CAPITAL CAMPAIGN',
    section: 'campaign'
  },
  {
    id: 'campaign_heading',
    type: 'text',
    label: 'Campaign Heading',
    value: 'Future Ready',
    section: 'campaign'
  },
  {
    id: 'campaign_subheading',
    type: 'textarea',
    label: 'Campaign Subheading',
    value:
      'Educating and mentoring our members for a promising tomorrow. Join us in building a brighter future for the youth of Lynn.',
    section: 'campaign'
  },
  {
    id: 'campaign_video_title',
    type: 'text',
    label: 'Video Title',
    value: 'Watch Our Story',
    section: 'campaign'
  },
  {
    id: 'campaign_video_subtitle',
    type: 'text',
    label: 'Video Subtitle',
    value: 'Capital Campaign: Phase 2',
    section: 'campaign'
  },
  {
    id: 'campaign_video_duration',
    type: 'text',
    label: 'Video Duration',
    value: '2:07',
    section: 'campaign'
  },
  {
    id: 'campaign_about_heading',
    type: 'text',
    label: 'About Heading',
    value: 'Building a Brighter Future',
    section: 'campaign'
  },
  {
    id: 'campaign_about_paragraph1',
    type: 'textarea',
    label: 'About Paragraph 1',
    value:
      'To continue our mission and expand our impact, we are embarking on a significant capital campaign for the expansion of our club. This expansion is designed to enhance our existing programs and facilities, providing more for our current members and increasing our capacity to serve even more youth in our community.',
    section: 'campaign'
  },
  {
    id: 'campaign_about_paragraph2',
    type: 'textarea',
    label: 'About Paragraph 2',
    value:
      'We currently have a waitlist and would like to open our doors to new members. This expansion will double the square footage of our building, enabling us to open our doors to close to 700 members.',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_1_title',
    type: 'text',
    label: 'Expansion Feature 1 Title',
    value: 'Two New Classrooms',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_1_description',
    type: 'textarea',
    label: 'Expansion Feature 1 Description',
    value: 'Age-appropriate learning spaces for our Licensed OST Programming',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_2_title',
    type: 'text',
    label: 'Expansion Feature 2 Title',
    value: 'Youth Gymnasium',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_2_description',
    type: 'textarea',
    label: 'Expansion Feature 2 Description',
    value: 'Dedicated gym space designed for our younger members',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_3_title',
    type: 'text',
    label: 'Expansion Feature 3 Title',
    value: 'Commercial Kitchen',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_3_description',
    type: 'textarea',
    label: 'Expansion Feature 3 Description',
    value: 'Full-service kitchen to support nutrition programs',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_4_title',
    type: 'text',
    label: 'Expansion Feature 4 Title',
    value: 'Cafeteria for 80',
    section: 'campaign'
  },
  {
    id: 'campaign_expansion_feature_4_description',
    type: 'textarea',
    label: 'Expansion Feature 4 Description',
    value: 'Modern dining space for our growing membership',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_heading',
    type: 'text',
    label: 'Teen Center Heading',
    value: 'Teen Center Expansion',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_subheading',
    type: 'textarea',
    label: 'Teen Center Subheading',
    value: 'A dedicated space designed specifically for our teenage members',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_feature_1',
    type: 'text',
    label: 'Teen Feature 1',
    value: 'Dedicated Teen Wing',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_feature_2',
    type: 'text',
    label: 'Teen Feature 2',
    value: 'Planet Fitness Room',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_feature_3',
    type: 'text',
    label: 'Teen Feature 3',
    value: 'Dance & Theater Center',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_feature_4',
    type: 'text',
    label: 'Teen Feature 4',
    value: 'Game Room',
    section: 'campaign'
  },
  {
    id: 'campaign_teen_feature_5',
    type: 'text',
    label: 'Teen Feature 5',
    value: 'Upgraded Pool & Splash Pad',
    section: 'campaign'
  },
  {
    id: 'campaign_renderings_heading',
    type: 'text',
    label: 'Renderings Heading',
    value: 'Renderings',
    section: 'campaign'
  },
  {
    id: 'campaign_renderings_subheading',
    type: 'textarea',
    label: 'Renderings Subheading',
    value: 'Preview our vision for the expanded facility',
    section: 'campaign'
  },
  {
    id: 'campaign_financials_heading',
    type: 'text',
    label: 'Financials Heading',
    value: 'What It Will Take',
    section: 'campaign'
  },
  {
    id: 'campaign_quote',
    type: 'textarea',
    label: 'Campaign Quote',
    value:
      "Together, we can ensure that our community's youth go on to reach their full potential. At the Boys & Girls Club of Lynn we believe that Great Futures Start Here.",
    section: 'campaign'
  },
  {
    id: 'campaign_cta_heading',
    type: 'text',
    label: 'CTA Heading',
    value: 'Help Us Build the Future',
    section: 'campaign'
  },
  {
    id: 'campaign_cta_subheading',
    type: 'textarea',
    label: 'CTA Subheading',
    value:
      'We invite you to join us in this inspiring journey. Your financial contribution will play a crucial role in making this vision a reality, ensuring that we continue to nurture and support the members of our community for years to come.',
    section: 'campaign'
  },
  {
    id: 'campaign_cta_impact_label',
    type: 'text',
    label: 'CTA Impact Label',
    value: 'Your generous contribution will help us:',
    section: 'campaign'
  },
  {
    id: 'campaign_impact_point_1',
    type: 'textarea',
    label: 'Impact Point 1',
    value: 'Increase our capacity to serve more members',
    section: 'campaign'
  },
  {
    id: 'campaign_impact_point_2',
    type: 'textarea',
    label: 'Impact Point 2',
    value: 'Enhance our programs with state-of-the-art facilities',
    section: 'campaign'
  },
  {
    id: 'campaign_impact_point_3',
    type: 'textarea',
    label: 'Impact Point 3',
    value: 'Provide a safe and supportive environment for our members to develop critical skills and healthy habits',
    section: 'campaign'
  },
  {
    id: 'campaign_cta_closing',
    type: 'textarea',
    label: 'CTA Closing Paragraph',
    value:
      'By committing to this project, you are making a lasting difference in the lives of young people in Lynn. Together, we can ensure that every child has the opportunity to realize their full potential and become productive, responsible, and caring citizens.',
    section: 'campaign'
  }
]

export const citContent: PageField[] = [
  {
    id: 'cit_eyebrow',
    type: 'text',
    label: 'CIT Eyebrow',
    value: 'Counselor-in-Training',
    section: 'cit'
  },
  {
    id: 'cit_heading',
    type: 'text',
    label: 'CIT Heading',
    value: 'CIT Application',
    section: 'cit'
  },
  {
    id: 'cit_paragraph1',
    type: 'textarea',
    label: 'CIT Paragraph 1',
    value:
      'The CIT Program at Camp Creighton Pond in Middleton, MA offers participants opportunities to creating valuable relationships with our kids, staff, and peers for the hope of extending their journeys with us and/or the world around them. Our program involves teaching organization skills, offering opportunities to take initiative, developing leadership and time management skills, as well as having fun and creating memories in our outdoor recreational areas!',
    section: 'cit'
  },
  {
    id: 'cit_paragraph2',
    type: 'textarea',
    label: 'CIT Paragraph 2',
    value:
      'Note: Tuition is $65 per week & the application opens from April 6th – May 1st. Any questions can be directed to info@bgcl.org. If selected, orientation will be held at Camp Creighton Pond, Middleton, MA (date is TBD). More information will follow after the selection process.',
    section: 'cit'
  }
]

export const contactContent: PageField[] = [
  {
    id: 'contact_eyebrow',
    type: 'text',
    label: 'Contact Eyebrow',
    value: 'Get In Touch',
    section: 'contact'
  },
  {
    id: 'contact_heading',
    type: 'text',
    label: 'Contact Heading',
    value: 'Contact Us',
    section: 'contact'
  },
  {
    id: 'contact_subheading',
    type: 'textarea',
    label: 'Contact Subheading',
    value:
      "Fill out the form below if you'd like to get involved with the Boys & Girls Club of Lynn or if you have any questions. We'll get back to you as soon as possible.",
    section: 'contact'
  },
  {
    id: 'contact_phone_label',
    type: 'text',
    label: 'Phone Label',
    value: 'Phone',
    section: 'contact'
  },
  {
    id: 'contact_phone_value',
    type: 'text',
    label: 'Phone Number',
    value: '781-593-1772',
    section: 'contact'
  },
  {
    id: 'contact_phone_href',
    type: 'text',
    label: 'Phone Href',
    value: 'tel:781-593-1772',
    section: 'contact'
  },
  {
    id: 'contact_email_label',
    type: 'text',
    label: 'Email Label',
    value: 'Email',
    section: 'contact'
  },
  {
    id: 'contact_email_value',
    type: 'text',
    label: 'Email Address',
    value: 'info@bgcl.org',
    section: 'contact'
  },
  {
    id: 'contact_email_href',
    type: 'text',
    label: 'Email Href',
    value: 'mailto:info@bgcl.org',
    section: 'contact'
  },
  {
    id: 'contact_address_label',
    type: 'text',
    label: 'Address Label',
    value: 'Address',
    section: 'contact'
  },
  {
    id: 'contact_address_value',
    type: 'textarea',
    label: 'Address',
    value: '25 North Common Street\nLynn, MA 01902',
    section: 'contact'
  },
  {
    id: 'contact_address_href',
    type: 'text',
    label: 'Address Href',
    value: "https://www.google.com/maps/place/Boy's+%26+Girl's+Club+of+Lynn/@42.4642936,-70.9540298,15z/",
    section: 'contact'
  },
  {
    id: 'contact_hours_office_period',
    type: 'text',
    label: 'Office Hours Period',
    value: 'Office',
    section: 'contact'
  },
  {
    id: 'contact_hours_office_time',
    type: 'text',
    label: 'Office Hours Time',
    value: '9am – 5pm',
    section: 'contact'
  },
  {
    id: 'contact_hours_programming_period',
    type: 'text',
    label: 'Programming Hours Period',
    value: 'Programming',
    section: 'contact'
  },
  {
    id: 'contact_hours_programming_time',
    type: 'text',
    label: 'Programming Hours Time',
    value: '1:45pm – 6pm',
    section: 'contact'
  },
  {
    id: 'contact_hours_teen_period',
    type: 'text',
    label: 'Teen Hours Period',
    value: 'Teen Hours',
    section: 'contact'
  },
  {
    id: 'contact_hours_teen_time',
    type: 'text',
    label: 'Teen Hours Time',
    value: '1:45pm – 8:30pm',
    section: 'contact'
  }
]

export const eventsContent: PageField[] = [
  {
    id: 'events_eyebrow',
    type: 'text',
    label: 'Events Eyebrow',
    value: 'Join Us',
    section: 'events'
  },
  {
    id: 'events_heading',
    type: 'text',
    label: 'Events Heading',
    value: '9th Annual Gala - October 21, 2026 @ 5pm- Danversport- 161 Elliot Street, Danvers, MA 01923',
    section: 'events'
  },
  {
    id: 'events_subheading',
    type: 'textarea',
    label: 'Events Subheading',
    value: 'Guest Speaker: Adam Vinatieri- Pro Football Hall of Fame & 4x Patriots Super Bowl Champion',
    section: 'events'
  }
]

export const getInvolvedContent: PageField[] = [
  {
    id: 'careers_eyebrow',
    type: 'text',
    label: 'Careers Eyebrow',
    value: 'Opportunities',
    section: 'get-involved'
  },
  {
    id: 'careers_heading',
    type: 'text',
    label: 'Careers Heading',
    value: 'Join Our Team',
    section: 'get-involved'
  },
  {
    id: 'careers_paragraph1',
    type: 'textarea',
    label: 'Careers Paragraph 1',
    value:
      "Do you have a passion for working with children or teenagers? Do you want to make a positive impact in your community? If so, join our team at Boys & Girls Clubs of Lynn and make a difference! At the Boys & Girls Club of Lynn, we believe that hiring, developing and retaining skilled, passionate staff members is where it all begins. That's because our work is anchored in our staff's ability to bring our mission to life by enabling young people to realize their full potential. Our Club continuously looks for talented individuals interested in working with youth to join our team.",
    section: 'get-involved'
  },
  {
    id: 'careers_paragraph2',
    type: 'textarea',
    label: 'Careers Paragraph 2',
    value:
      'The Boys & Girls Clubs of Lynn is committed to a policy of equal employment opportunity and does not discriminate against employees or applicants for employment on the basis of any characteristic that is protected by law.',
    section: 'get-involved'
  },
  {
    id: 'careers_volunteer_link',
    type: 'text',
    label: 'Volunteer Link Text',
    value: 'Interested in becoming a volunteer?',
    section: 'get-involved'
  }
]

export const holidayGivingContent: PageField[] = [
  {
    id: 'hero_eyebrow',
    type: 'text',
    label: 'Eyebrow',
    value: 'Holiday Giving & Volunteering',
    section: 'hero'
  },
  {
    id: 'hero_heading',
    type: 'text',
    label: 'Heading',
    value: 'Give a Little. Make the Holidays Brighter.',
    section: 'hero'
  },
  {
    id: 'hero_paragraph',
    type: 'textarea',
    label: 'Intro paragraph',
    value:
      'This holiday season, help us bring joy, warmth, and hope to local children and families. There are many ways to get involved!',
    section: 'hero'
  },

  {
    id: 'ways_heading',
    type: 'text',
    label: 'Section heading',
    value: 'Ways to Give',
    section: 'ways to give'
  },

  {
    id: 'way_1_title',
    type: 'text',
    label: 'Way 1 title',
    value: 'Thanksgiving Baskets',
    section: 'ways to give'
  },
  {
    id: 'way_1_description',
    type: 'textarea',
    label: 'Way 1 description',
    value: 'Donate food, complete baskets, or grocery gift cards to help families enjoy a Thanksgiving meal.',
    section: 'ways to give'
  },

  {
    id: 'way_2_title',
    type: 'text',
    label: 'Way 2 title',
    value: 'Toy Drive',
    section: 'ways to give'
  },
  {
    id: 'way_2_description',
    type: 'textarea',
    label: 'Way 2 description',
    value: 'Donate new, unwrapped toys for children and teens.',
    section: 'ways to give'
  },

  {
    id: 'way_3_title',
    type: 'text',
    label: 'Way 3 title',
    value: 'Holiday Party Gifts',
    section: 'ways to give'
  },
  {
    id: 'way_3_description',
    type: 'textarea',
    label: 'Way 3 description',
    value: 'Help provide gifts and stocking stuffers for our holiday celebrations.',
    section: 'ways to give'
  },

  {
    id: 'way_4_title',
    type: 'text',
    label: 'Way 4 title',
    value: 'Adopt a Child',
    section: 'ways to give'
  },
  {
    id: 'way_4_description',
    type: 'textarea',
    label: 'Way 4 description',
    value: 'Sponsor a child and help fulfill their holiday wish list.',
    section: 'ways to give'
  },

  {
    id: 'way_5_title',
    type: 'text',
    label: 'Way 5 title',
    value: 'Volunteer',
    section: 'ways to give'
  },
  {
    id: 'way_5_description',
    type: 'textarea',
    label: 'Way 5 description',
    value:
      'Join us at holiday gatherings, distributions, and events. Help with setup, meals, activities, gift wrapping, and more.',
    section: 'ways to give'
  },

  {
    id: 'way_6_title',
    type: 'text',
    label: 'Way 6 title',
    value: 'More Ways to Help',
    section: 'ways to give'
  },
  {
    id: 'way_6_description',
    type: 'textarea',
    label: 'Way 6 description',
    value: 'Donate winter clothing, blankets, personal care items, gift cards, or make a monetary donation.',
    section: 'ways to give'
  },

  {
    id: 'closing_heading',
    type: 'text',
    label: 'Closing heading',
    value: 'Make a Difference This Holiday Season',
    section: 'closing'
  },
  {
    id: 'closing_paragraph',
    type: 'textarea',
    label: 'Closing paragraph',
    value:
      'Whether you give a gift, donate a meal, adopt a child, or volunteer your time, your kindness can make the holidays brighter for someone in our community.',
    section: 'closing'
  },
  {
    id: 'closing_cta_heading',
    type: 'text',
    label: 'Contact heading',
    value: 'Interested in donating or volunteering?',
    section: 'closing'
  },
  {
    id: 'closing_cta_email',
    type: 'text',
    label: 'Contact email',
    value: 'info@bgcl.org',
    section: 'closing'
  },

  // Paste a Google Drive link, the same way the newsletters work. Empty slots
  // are not rendered.
  {
    id: 'flyer_1_label',
    type: 'text',
    label: 'Flyer 1 label',
    value: '',
    section: 'flyers'
  },
  {
    id: 'flyer_1_url',
    type: 'text',
    label: 'Flyer 1 link',
    value: '',
    section: 'flyers'
  },
  {
    id: 'flyer_2_label',
    type: 'text',
    label: 'Flyer 2 label',
    value: '',
    section: 'flyers'
  },
  {
    id: 'flyer_2_url',
    type: 'text',
    label: 'Flyer 2 link',
    value: '',
    section: 'flyers'
  },
  {
    id: 'flyer_3_label',
    type: 'text',
    label: 'Flyer 3 label',
    value: '',
    section: 'flyers'
  },
  {
    id: 'flyer_3_url',
    type: 'text',
    label: 'Flyer 3 link',
    value: '',
    section: 'flyers'
  },

  {
    id: 'photo_1',
    type: 'image',
    label: 'Photo 1',
    value: '',
    section: 'photos'
  },
  {
    id: 'photo_1_caption',
    type: 'text',
    label: 'Photo 1 caption',
    value: '',
    section: 'photos'
  },
  {
    id: 'photo_2',
    type: 'image',
    label: 'Photo 2',
    value: '',
    section: 'photos'
  },
  {
    id: 'photo_2_caption',
    type: 'text',
    label: 'Photo 2 caption',
    value: '',
    section: 'photos'
  },
  {
    id: 'photo_3',
    type: 'image',
    label: 'Photo 3',
    value: '',
    section: 'photos'
  },
  {
    id: 'photo_3_caption',
    type: 'text',
    label: 'Photo 3 caption',
    value: '',
    section: 'photos'
  }
]

export const homeContent: PageField[] = [
  {
    id: 'modal_heading',
    type: 'text',
    label: 'Modal Heading',
    value: 'Looking to attend our 9th Annual Gala? ',
    section: 'modal'
  },
  {
    id: 'modal_subheading',
    type: 'textarea',
    label: 'Modal Subheading',
    value: 'Purchase your tickets & sponsorships before they are sold-out! ',
    section: 'modal'
  },
  {
    id: 'modal_button1Text',
    type: 'text',
    label: 'Button 1 Text',
    value: 'Purchase ',
    section: 'modal'
  },
  {
    id: 'modal_button1Link',
    type: 'text',
    label: 'Button 1 Link',
    value: 'https://www.bgcl.org/events/cmpr70dxu0000lt7prbidiy07',
    section: 'modal'
  },
  {
    id: 'modal_button2Text',
    type: 'text',
    label: 'Button 2 Text',
    value: 'Maybe Later ',
    section: 'modal'
  },
  {
    id: 'modal_toggleModal',
    type: 'boolean',
    label: 'Show Modal',
    value: 'true',
    section: 'modal'
  },
  {
    id: 'mission_heading',
    type: 'text',
    label: 'Mission Heading',
    value: 'Our Mission',
    section: 'mission'
  },
  {
    id: 'mission_subheading',
    type: 'text',
    label: 'Mission Subheading',
    value: 'Our purpose',
    section: 'mission'
  },
  {
    id: 'mission_bodyText',
    type: 'textarea',
    label: 'Mission Body Text',
    value:
      'To inspire and enable all young people, especially those that need us the most, to realize their full potential as productive responsible and caring citizens!',
    section: 'mission'
  },
  {
    id: 'mission_button1Text',
    type: 'text',
    label: 'Button 1 Text',
    value: 'Volunteer',
    section: 'mission'
  },
  {
    id: 'mission_button2Text',
    type: 'text',
    label: 'Button 2 Text',
    value: 'Donate',
    section: 'mission'
  },
  {
    id: 'mission_button2Link',
    type: 'text',
    label: 'Button 2 Link',
    value: '/donate',
    section: 'mission'
  },
  {
    id: 'facility_heading1',
    type: 'text',
    label: 'Facility Heading 1',
    value: 'Building',
    section: 'facility'
  },
  {
    id: 'facility_heading2',
    type: 'text',
    label: 'Facility Heading 2',
    value: 'the Future',
    section: 'facility'
  },
  {
    id: 'facility_subheading',
    type: 'text',
    label: 'Facility Subheading',
    value: 'Our Transformation',
    section: 'facility'
  },
  {
    id: 'facility_paragraph1',
    type: 'textarea',
    label: 'Facility Paragraph 1',
    value:
      'In 2020, The Boys & Girls Club of Lynn underwent a $6.4 million dollar renovation. With the support of our many donors, we were able to complete a big portion of our building renovation. We are proud to offer the following new additions to our facility: Dance Studio, STEAM Lab, Planet Fitness Gym, Teen Center, Gaming Room, as well as a Technology Center.',
    section: 'facility'
  },
  {
    id: 'facility_paragraph2',
    type: 'textarea',
    label: 'Facility Paragraph 2',
    value:
      'The club also has a new and improved lobby area, Board Room, multiple office space for our staff, bathrooms, registration areas and more! Our Kids Club and Afterschool program spaces have been fully renovated as well! At our Kids Club, we offer 3 dedicated classrooms, a huge open play and activity area along with a tower garden for our little members to explore and delve into the art of gardening.',
    section: 'facility'
  },
  {
    id: 'facility_paragraph3',
    type: 'textarea',
    label: 'Facility Paragraph 3',
    value:
      'Our newly enhanced After School Drop In Center is equipped with a dedicated Teen area as well as the aforementioned STEAM Lab, Gym, Dance Studio, Gaming area and also a Tower Garden for our older members to test out their gardening skills!',
    section: 'facility'
  },
  {
    id: 'programs_heading1',
    type: 'text',
    label: 'Programs Heading 1',
    value: 'Building',
    section: 'programs'
  },
  {
    id: 'programs_heading2',
    type: 'text',
    label: 'Programs Heading 2',
    value: 'Skills for Tomorrow',
    section: 'programs'
  },
  {
    id: 'programs_subheading',
    type: 'text',
    label: 'Programs Subheading',
    value: 'Our programs',
    section: 'programs'
  },
  {
    id: 'facility_paragraph4',
    type: 'textarea',
    label: 'Facility Paragraph 4',
    value:
      'Presently, we in our Phase 2 renovations which will begin with opening a Preschool Center located at 35 Franklin Street. In 2027, we are looking forward to offering more classrooms for our Licensed Child Care program, a new Gym, new Pool, Teen Wing, Games Room, Commercial Kitchen, and more!',
    section: 'facility'
  }
]

export const latestNewsContent: PageField[] = [
  {
    id: 'news_eyebrow',
    type: 'text',
    label: 'News Eyebrow',
    value: 'Resources & Updates',
    section: 'news'
  },
  {
    id: 'news_heading',
    type: 'text',
    label: 'News Heading',
    value: 'Latest News',
    section: 'news'
  },
  {
    id: 'news_subheading',
    type: 'textarea',
    label: 'News Subheading',
    value: 'Your one-stop destination for club resources, newsletters, and important information.',
    section: 'news'
  },
  {
    id: 'news_subscribe_heading',
    type: 'text',
    label: 'Subscribe Heading',
    value: 'Stay Updated',
    section: 'news'
  },
  {
    id: 'news_subscribe_subheading',
    type: 'textarea',
    label: 'Subscribe Subheading',
    value: 'Subscribe to our newsletter and never miss important updates, program announcements, and community news.',
    section: 'news'
  },
  {
    id: 'news_newsletters_heading',
    type: 'text',
    label: 'Newsletters Heading',
    value: 'Newsletters',
    section: 'news'
  },
  {
    id: 'news_newsletters_subheading',
    type: 'textarea',
    label: 'Newsletters Subheading',
    value: 'Download our latest newsletters to stay informed about programs, events, and updates.',
    section: 'news'
  },
  {
    id: 'news_cta_heading',
    type: 'text',
    label: 'CTA Heading',
    value: "Can't Find What You Need?",
    section: 'news'
  },
  {
    id: 'news_cta_subheading',
    type: 'textarea',
    label: 'CTA Subheading',
    value: 'Our team is here to help. Contact us with any questions or to request additional resources.',
    section: 'news'
  }
]

export const partnershipsContent: PageField[] = [
  {
    id: 'partners_eyebrow',
    type: 'text',
    label: 'Partners Eyebrow',
    value: 'Community & Corporate Support',
    section: 'partners'
  },
  {
    id: 'partners_heading',
    type: 'text',
    label: 'Partners Heading',
    value: 'Our Partnerships',
    section: 'partners'
  },
  {
    id: 'partners_subheading',
    type: 'textarea',
    label: 'Partners Subheading',
    value:
      'The Boys & Girls Club of Lynn is powered by the generosity of our community partners. Together, we create opportunities that change the lives of young people every day.',
    section: 'partners'
  },
  {
    id: 'partners_cta_eyebrow',
    type: 'text',
    label: 'CTA Eyebrow',
    value: 'Get Involved',
    section: 'partners'
  },
  {
    id: 'partners_cta_heading',
    type: 'text',
    label: 'CTA Heading',
    value: 'Become a Partner',
    section: 'partners'
  },
  {
    id: 'partners_cta_subheading',
    type: 'textarea',
    label: 'CTA Subheading',
    value:
      'Join our network of community champions. Your support directly funds programs, mentors, and opportunities for the young people of Lynn.',
    section: 'partners'
  }
]

export const programsContent: PageField[] = [
  {
    id: 'programs_eyebrow',
    type: 'text',
    label: 'Programs Eyebrow',
    value: 'Our Offerings',
    section: 'programs'
  },
  {
    id: 'programs_heading',
    type: 'text',
    label: 'Programs Heading',
    value: 'Our Programs',
    section: 'programs'
  },
  {
    id: 'programs_subheading',
    type: 'textarea',
    label: 'Programs Subheading',
    value: 'Discover a wide range of programs designed to inspire, challenge, and empower youth in our community.',
    section: 'programs'
  }
]

export const teamContent: PageField[] = [
  {
    id: 'team_eyebrow',
    type: 'text',
    label: 'Team Eyebrow',
    value: 'Meet Our Team',
    section: 'team'
  },
  {
    id: 'team_board_heading',
    type: 'text',
    label: 'Board Heading',
    value: 'Board of Directors',
    section: 'team'
  },
  {
    id: 'team_staff_heading',
    type: 'text',
    label: 'Staff Heading',
    value: 'Our Team',
    section: 'team'
  },
  {
    id: 'team_board_subheading',
    type: 'textarea',
    label: 'Board Subheading',
    value:
      'Our Board of Directors provides strategic guidance and governance to ensure we continue our mission of transforming youth lives.',
    section: 'team'
  },
  {
    id: 'team_staff_subheading',
    type: 'textarea',
    label: 'Staff Subheading',
    value: 'Dedicated professionals committed to transforming lives and building brighter futures for our youth.',
    section: 'team'
  }
]
