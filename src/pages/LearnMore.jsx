import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import CollapsibleSection from '../components/CollapsibleSection'

const LearnMore = () => {
  const { slug } = useParams()

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    // Multiple approaches to ensure scroll to top works
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    
    // Immediate scroll
    scrollToTop()
    
    // Delayed scroll to handle any async rendering
    const timeoutId = setTimeout(scrollToTop, 0)
    
    // Cleanup
    return () => clearTimeout(timeoutId)
  }, [slug])

  // Topic metadata
  const topicTitles = {
    'scouts': 'Scouts Movement',
    'womens-land-army': 'Women\'s Land Army',
    'junior-salvage-stewards': 'Junior Salvage Stewards'
  }

  const topicTitle = topicTitles[slug] || slug

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <div className="flex items-center space-x-2 text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <Link to={`/topic/${slug}/classroom`} className="hover:text-blue-600">{topicTitle}</Link>
          <span>›</span>
          <span className="text-gray-900">Learn More</span>
        </div>
      </nav>

      {/* Back to Investigation button */}
      <div className="mb-8">
        <Link
          to={`/topic/${slug}/classroom`}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Investigation
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {slug === 'womens-land-army' ? (
          <div>
            {/* Page Title */}
            <div className="prose prose-lg max-w-none mb-6">
              <h1>Learn More About {topicTitle}</h1>
            </div>
            
            {/* Summary Section - Two Column Layout like Grace introduction */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Image */}
              <div className="md:col-span-1 flex justify-center">
                <img 
                  src="/assets/character-image.png"
                  alt="Image of a girl smiling and waving"
                  className="w-56 h-56 object-cover rounded-lg"
                />
              </div>
              
              {/* Right Column - Summary Text */}
              <div className="md:col-span-2">
                <div className="prose prose-lg">
                  <div className="text-lg leading-relaxed space-y-4">
                    {/* Summary text placeholder - you'll add the actual content */}
                    <p>We've learnt so much from those objects! Thanks for helping me to investigate 😊. </p>
                    <p>Have a look through the sections below to learn more about life in the Women's Land Army.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Collapsible Content Sections */}
            <div className="space-y-6">
              {/* Uniform Section - Images Left, Text Right */}
              <CollapsibleSection title="Uniform" defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/uniform-breeches.jpg"
                        alt="Women's Land Army uniform breeches"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 8839)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/uniform-dungarees.jpg"
                        alt="Women's Land Army uniform dungarees"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 8824)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/uniform-coat.jpg"
                        alt="Women's Land Army uniform coat"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 11222)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>It wasn't only food that was in short supply - clothes were rationed too. The Land Army uniform was free, but women had to hand over most of their clothing ration coupons to receive it.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "Volunteers are proud of their uniform, both for its looks and its significance"
                      <footer className="text-sm mt-2">— The Land Girl Magazine, April 1942, p.1.</footer>
                    </blockquote>
                    
                    <p>The Women's Land Army uniform was distinctive and practical. The trousers (known as breeches) allowed women to move freely while doing their work. Members of the Land Army could also wear dungarees, which you can see in the second image, and some even cut these into shorts for hot weather.</p>
                    
                    <p>They also wore shirts, green pullovers (jumpers), a leather belt, long socks and brown shoes. In the winter, they would also wear a long brown coat. See if you can spot some of these items in the photos.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "I thought I rather like the look of their uniform, yes, I think I might join the Land Army"
                      <footer className="text-sm mt-2">— Iris Lillian Hobby, IWM (18274), (12:21-12:28).</footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Work Section - Images Left, Text Right */}
              <CollapsibleSection title="Work" defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/tractor-driving.jpg"
                        alt="Anne driving a tractor for the Women's Land Army"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 8823)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/harvesting-wheat.jpg"
                        alt="Women's Land Army members harvesting wheat"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (HU 36274)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/fields.jpg"
                        alt="Women's Land Army working in the fields"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 8826)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/milking.jpg"
                        alt="Women's Land Army member milking cows"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 186)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>Work in the Women's Land Army could be different depending on the kind of farm you were sent to. Many women were sent to arable farms, meaning that they were helping to grow crops.</p>
                    
                    <p>Jobs on these farms could include driving tractors, like Anne in the photo, or operating machinery to harvest crops. In the second image, women from the Land Army are harvesting wheat.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "‘The different work I did with tractors is too numerous to mention. I did a lot of specialised work, such as row crop hoeing, when I would carefully drive between rows of crops less than a foot apart, and make sure that I did not cut any small plants out on the way. It always made me nervous when my boss would come and stand at the end of the rows and watch my performance - I'm sure I must have cut one or two out on those occasions!’"
                      <footer className="text-sm mt-2">— Betty Merrit, <a href="https://www.bbc.co.uk/history/ww2peopleswar/stories/61/a4972061.shtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">WW2 People's War - BBC</a></footer>
                    </blockquote>
                    
                    <p>There was plenty of physical work too. Women would work long hours preparing fields for planting crops, as well as feeding animals such as pigs, geese, chickens and cows. Work on a farm doesn't stop for bad weather, so they would have to go out in the rain and even snow to make sure the animals were looked after.</p>
                    
                    <p>Some women received additional training when they joined the Land Army. They were taught how to milk cows, and then were sent to dairy farms. There they would record the amount of milk that was being produced, make sure that the cows were fed, and milk them every morning and evening.</p>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Life Section - Images Left, Text Right */}
              <CollapsibleSection title="Life" defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/piano-sing-song.jpg"
                        alt="Women in the Land Army having a sing-song around a piano"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 8833)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/land-army-dance.jpg"
                        alt="Women's Land Army members at a dance"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 14123)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/tea.jpg"
                        alt="Women's Land Army members having tea"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© IWM (D 8837)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>Women in the Land Army still made time for socialising, despite the long and tiring days. Those who were living in hostels with lots of other Land Girls often hosted dances and tea parties, as well as having sing-songs round the piano.</p>
                    
                    <p>There were also dances held in local village halls, with party food and the latest music. If there was a military base nearby, servicemen would also attend the dances, bringing with them more food and sometimes even a band to replace the typical gramophone. These dances were very popular among members of the Women's Land Army.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "After a hard day's work most evenings were spent doing mending, knitting, writing lots of letters which I always enjoyed, and listening to the wireless (as it was called in those days), or just talking. However, on Saturday evenings a dance was held in the village hall."
                      <footer className="text-sm mt-2">— Mollie Wake Rogers (née Mitford), <a href="https://www.womenslandarmy.co.uk/mollie-wake-rogers-nee-mitford/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Women's Land Army website</a></footer>
                    </blockquote>
                    
                    <p>Relaxing didn't just involve going to parties. There was plenty of time spent sitting around in the evenings, sewing, knitting, crocheting, chatting, or going to the local pub to play darts.</p>
                    
                    <p>Some women were hosted in the farmhouse where they worked. If they got along with the family, they might socialise with them, as Iris Joyce is doing in this photo.</p>
                  </div>
                </div>
              </CollapsibleSection>

              {/* After the War Section - Images Left, Text Right */}
              <CollapsibleSection title="After the War" defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/commemorative-badge.jpg"
                        alt="Women's Land Army commemorative badge awarded in 2008"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/memorial.jpg"
                        alt="Women's Land Army memorial in Lichfield, Staffordshire"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">© Colin Sweett (WMR-74909)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>At the end of the war, the British Government did not give members of the Women's Land Army the same financial support as other Home Front volunteers. It took until 2008 for their contribution to the war effort to be officially recognised, when surviving Land Girls were awarded a commemorative badge.</p>
                    
                    <p>In 2014, a memorial was unveiled in Lichfield, Staffordshire, commemorating the service of the Women's Land Army in both World War One and World War Two. The inscription includes this quote:</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "A great response by the women of our country to the call of duty in the nation's hour of danger and need… and for this, the nation owes them an everlasting debt"
                      <footer className="text-sm mt-2">— Her late Majesty Queen Elizabeth the Queen Mother, Patron of the Women's Land Army and Women's Timber Corps</footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">
                Note: Learn more content is not yet available for this topic. Default content is shown below.
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h1>Learn More About {topicTitle}</h1>
              <p>This page will contain additional information about {topicTitle}.</p>
              <p>Content coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Resources */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="space-y-2">
          <Link
            to={`/topic/${slug}/resources`}
            className="block text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Teaching Resources for {topicTitle}
          </Link>
          <Link
            to={`/topic/${slug}/classroom`}
            className="block text-blue-600 hover:text-blue-800 hover:underline"
          >
            Return to Classroom Investigation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LearnMore
