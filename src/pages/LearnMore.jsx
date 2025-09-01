import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CollapsibleSection from '../components/CollapsibleSection'

const LearnMore = () => {
  const { slug } = useParams()
  const [isActivityPromptOpen, setIsActivityPromptOpen] = useState(false)
  const [openSection, setOpenSection] = useState(null)

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
    'scouts': 'Scouts',
    'womens-land-army': 'Women\'s Land Army',
    'junior-salvage-stewards': 'Junior Salvage Stewards'
  }

  const topicTitle = topicTitles[slug] || slug

  // Activity prompts for each topic
  const activityPrompts = {
    'womens-land-army': (
      <div>
        <p><strong>Design a propaganda poster encouraging people to join the Women's Land Army.</strong></p>
        <p className="mt-3">Think about:</p>
        <ul className="mt-2 ml-4 list-disc space-y-2">
          <li>why propaganda posters were created during World War Two</li>
          <li>how you can present a positive image of life in the Land Army</li>
          <li>what might encourage you to join the Land Army</li>
        </ul>
      </div>
    ),
    'scouts': (
      <div>
        <p><strong>Design a badge for a job that the Scouts did during World War Two.</strong></p>
        <p className="mt-3">Think about:</p>
        <ul className="mt-2 ml-4 list-disc space-y-2">
          <li>Is there a job that you would like to have done if you were a Scout during World War Two?</li>
          <li>Will your design work as a badge? Will you keep it simple or make it detailed?</li>
        </ul>
        <p className="mt-3">You could also design a badge for the Guides, or one that shows a role done by both the Scouts and Guides.</p>
      </div>
    ),
    'junior-salvage-stewards': (
      <div>
        <p><strong>Write a postcard to a friend encouraging them to join the Junior Salvage Stewards.</strong></p>
        <p className="mt-3">Think about:</p>
        <ul className="mt-2 ml-4 list-disc space-y-2">
          <li>How will they be helping with the war effort?</li>
          <li>What makes salvage work fun?</li>
          <li>Are there any rewards for being a Cog?</li>
        </ul>
      </div>
    )
  }

  const activityPrompt = activityPrompts[slug] || <p>Activity content will be added here...</p>

  // Handle section toggling for accordion behavior
  const handleSectionToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId)
  }

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
              <h1>Learn More About The {topicTitle}</h1>
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
              <CollapsibleSection 
                title="Uniform" 
                isOpen={openSection === 'uniform'}
                onToggle={handleSectionToggle}
                sectionId="uniform"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/uniform-breeches.jpg"
                        alt="Women's Land Army uniform breeches"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 8839)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/uniform-dungarees.jpg"
                        alt="Women's Land Army uniform dungarees"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 8824)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/uniform-coat.jpg"
                        alt="Women's Land Army uniform coat"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 11222)</figcaption>
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
              <CollapsibleSection 
                title="Work" 
                isOpen={openSection === 'work'}
                onToggle={handleSectionToggle}
                sectionId="work"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/tractor-driving.jpg"
                        alt="Anne driving a tractor for the Women's Land Army"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 8823)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/harvesting-wheat.jpg"
                        alt="Women's Land Army members harvesting wheat"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (HU 36274)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/fields.jpg"
                        alt="Women's Land Army working in the fields"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 8826)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/milking.jpg"
                        alt="Women's Land Army member milking cows"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 186)</figcaption>
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
              <CollapsibleSection 
                title="Life" 
                isOpen={openSection === 'life'}
                onToggle={handleSectionToggle}
                sectionId="life"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/womens-land-army/piano-sing-song.jpg"
                        alt="Women in the Land Army having a sing-song around a piano"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 8833)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/land-army-dance.jpg"
                        alt="Women's Land Army members at a dance"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 14123)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/womens-land-army/tea.jpg"
                        alt="Women's Land Army members having tea"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Image: IWM (D 8837)</figcaption>
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
              <CollapsibleSection 
                title="After the War" 
                isOpen={openSection === 'after-war'}
                onToggle={handleSectionToggle}
                sectionId="after-war"
              >
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
        ) : slug === 'scouts' ? (
          <div>
            {/* Page Title */}
            <div className="prose prose-lg max-w-none mb-6">
              <h1>Learn More About The Scouts</h1>
            </div>
            
            {/* Summary Section - Two Column Layout like Grace introduction */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Grace Image */}
              <div className="md:col-span-1 flex justify-center">
                <img 
                  src="/assets/character-image.png"
                  alt="Grace"
                  className="w-56 h-56 object-cover rounded-lg"
                />
              </div>
              
              {/* Right Column - Summary Text */}
              <div className="md:col-span-2">
                <div className="prose prose-lg">
                  <div className="text-lg leading-relaxed space-y-4">
                    {/* ADD YOUR INTRO TEXT HERE - Replace the placeholders below */}
                    <p>We've learnt so much from those objects! Thanks for helping me to investigate 😊.</p>
                    <p>Have a look through the sections below to learn more about the Scouts during World War Two.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Collapsible Content Sections */}
            <div className="space-y-6">
              {/* History of the Scouts Section */}
              <CollapsibleSection 
                title="History of the Scouts" 
                isOpen={openSection === 'history'}
                onToggle={handleSectionToggle}
                sectionId="history"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (Q 108579).jpg"
                        alt="A Scout Troop during World War One"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        A Scout Troop during World War One<br />
                        Image: IWM (Q 108579)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/girl-guides-1918.jpg"
                        alt="Girl Guides in 1918"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Girl Guides in 1918</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (Q 30598).jpg"
                        alt="Boy Scouts working on a farm during World War One"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Boy Scouts working on a farm during World War One<br />
                        Image: IWM (Q 30598)
                      </figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>The Scouts began in 1908. Originally boys and girls aged 11-18 could join the Scouts, and girls even formed their own unofficial troops, but in 1910 the Girl Guides were founded and girls were no longer allowed to join the Scouts. A few years later, in 1916, the Wolf Cubs (now Cub Scouts) were formed for children under 11.</p>
                    
                    <p>The Scout motto is 'Be Prepared', and they learn practical skills and help out in their communities. This was the purpose of the Scouts in World War Two and it's still what they do today.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "We were encouraged to wear scout uniforms as often as possible so as to become recognised as one who would help on any occasion."
                      <footer className="text-sm mt-2">— Frank Vivian, <a href="https://www.bbc.co.uk/history/ww2peopleswar/stories/95/a5771595.shtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">BBC WW2 People's War Archive</a></footer>
                    </blockquote>
                    
                    <p>During World War One, lots of Scouts helped on the Home Front with farm work, fundraised for ambulances, and worked as messengers. This legacy carried on into their work on the Home Front during World War Two.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "I was proud that my Scout training was being put to use in helping defend my country"
                      <footer className="text-sm mt-2">— Ed Dowty, <a href="https://www.bbc.co.uk/history/ww2peopleswar/stories/14/a1124614.shtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">BBC WW2 People's War Archive</a></footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Dangerous Work Section */}
              <CollapsibleSection 
                title="Dangerous Work" 
                isOpen={openSection === 'dangerous-work'}
                onToggle={handleSectionToggle}
                sectionId="dangerous-work"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (FEQ 418).jpg"
                        alt="A fire bucket, stirrup pump and hose which were used to fight fires during World War Two"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        A fire bucket, stirrup pump and hose which were used to fight fires during World War Two.<br />
                        Image: IWM (FEQ 418)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (D 2625).jpg"
                        alt="Two ARP Wardens working as fire watchers. This is one of the jobs that Scouts helped with"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Two ARP Wardens working as fire watchers. This is one of the jobs that Scouts helped with.<br />
                        Image: IWM (D 2625)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (D 2650).jpg"
                        alt="Two men from the Fire Service attempt to put out a fire. Scouts would have made sure that they didn't run out of water"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Two men from the Fire Service attempt to put out a fire. Scouts would have made sure that they didn't run out of water.<br />
                        Image: IWM (D 2650)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/scout-messenger.jpg"
                        alt="ARP volunteers attend a mock incident for training. You can see a child, probably a Scout, acting as a messenger on the right in the photograph"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        ARP volunteers attend a mock incident for training. You can see a child, probably a Scout, acting as a messenger on the right in the photograph.
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (D 21246).jpg"
                        alt="A team of volunteers carry an injured person to an ambulance"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        A team of volunteers carry an injured person to an ambulance.<br />
                        Image: IWM (D 21246)
                      </figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>During air raids, there were lots of fires caused by bombs. Lots of Scouts volunteered as fire watchers, and would work through the night to keep a look out. Sometimes they would alert the authorities to the fires, sometimes they would smother nearby fires with sandbags, and on occasion they would even start putting out fires with water and a stirrup pump until the fire brigade arrived.</p>
                    
                    <p>Fire watching was vital because incendiary bombs were common and could spread fires rapidly. Some of these bombs didn't explode when they hit the ground, and they could be extremely dangerous if somebody stumbled across one unexpectedly. Some Scouts were sent to locate these unexploded incendiary bombs, which would then be safely smothered with sand and detonated by officials.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "We would be sent out, this was at the tender age of 16 or so, to locate reported unexploded bombs… when I look back, it was pretty fraught and really they shouldn't have been doing that with young people, but it was quite exciting."
                      <footer className="text-sm mt-2">— John William Fowles, <a href="https://www.iwm.org.uk/collections/item/object/80017666" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">IWM (18202)</a>, 03:25-03:45</footer>
                    </blockquote>
                    
                    <p>Lots of Scouts volunteered as messengers, including younger Scouts aged 11 or 12. The phone lines often stopped working because of the bombings, so young people would cycle between ARP (Air Raid Precautions) posts to deliver important messages.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "Anybody that had a cycle, we used to take messages from one ARP post to another ARP post. We were given a tin hat, and you had your [Scout] uniform on, and you used to cycle like mad. Normally this took place when there wasn't a raid on, but I have known cases for lads to actually go from ARP post to ARP post while a raid was actually in progress."
                      <footer className="text-sm mt-2">— Leonard Alfred Spicer, <a href="https://www.iwm.org.uk/collections/item/object/80028324" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">IWM (29566)</a>, Reel 2: 01:55-02:28</footer>
                    </blockquote>
                    
                    <p>Scouts were also involved in first aid during the war. Some volunteered as stretcher bearers, carrying injured people into ambulances or into hospital. Scouts were often trained in first aid and were able to help their local community in emergencies - one Scout troop ran a First Aid Post every night for the first year and a half of the war:</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "They have, since the first day of war, maintained sole charge of a First Aid Post each day from 5pm until 8:15am next morning. The Scout National Service Pennant - the third to date - has been awarded to this Troop"
                      <footer className="text-sm mt-2">— <a href="https://www.britishnewspaperarchive.co.uk/viewer/bl/0001758/19410314/116/0007" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Blaydon Courier, Friday 14 March 1941, p.7</a></footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Work in the Community Section */}
              <CollapsibleSection 
                title="Work in the Community" 
                isOpen={openSection === 'community-work'}
                onToggle={handleSectionToggle}
                sectionId="community-work"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (MOD 394).jpg"
                        alt="A Morrison Shelter ready to be slept in"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        A Morrison Shelter ready to be slept in<br />
                        Image: IWM (MOD 394)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (Q(HS) 99).jpg"
                        alt="A Morrison Shelter being used as a table tennis table"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        A Morrison Shelter being used as a table tennis table<br />
                        Image: IWM (Q(HS) 99)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (D 2593).jpg"
                        alt="Children being evacuated to the countryside"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Children being evacuated to the countryside<br />
                        Image: IWM (D 2593)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (D 16206).jpg"
                        alt="Scouts helping with the fruit harvest"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Scouts helping with the fruit harvest<br />
                        Image: IWM (D 16206)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/Image IWM (TR 2135).jpg"
                        alt="Scouts loading their salvage cart with scraps"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Scouts loading their salvage cart with scraps<br />
                        Image: IWM (TR 2135)
                      </figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>Scouts also helped people to prepare for air raids. While lots of people went to community shelters during raids, others had their own shelters within their homes, and Scouts helped to build these. Anderson shelters were dug into gardens, while Morrison shelters were built within houses. Both types were extremely popular, and over one million Morrison shelters had been installed by the end of the war in 1945 (many of these built by Scouts!).</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "Erecting the shelters was a dirty, heavy job which carried a guarantee of a crushed finger nail, cut arm or bruised something."
                      <footer className="text-sm mt-2">— James Franks, <a href="https://www.bbc.co.uk/history/ww2peopleswar/stories/64/a2427464.shtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">BBC WW2 People's War Archive</a></footer>
                    </blockquote>
                    
                    <p>Lots of Scouts were evacuated to the countryside, where they would be away from the bombing raids that were being launched on big cities. Scouts who already lived in the countryside helped welcome children to their towns and carried luggage.</p>
                    
                    <p>One of the most famous government campaigns of World War Two was the 'Dig For Victory' campaign. More food needed to be grown in Britain to fill shortages caused by the war, so citizens were encouraged to grow as much food as possible in their gardens. Scout helped to look after community plots of land and grow food, and they also harvested crops.</p>
                    
                    <p>Younger Scouts and Cubs didn't do the dangerous work during air raids, but they were still involved in the war effort. They contributed as Junior Salvage Stewards by collecting scrap materials from their neighbourhood, and often worked with other members of their Scout group.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "Scout troops and their associated cub packs had groups out with their trek carts collecting waste paper on established rounds. As a cub, I regularly went out with a group of scouts from the early days of 1940. When our cart was full, we would trundle off to a collection depot in Wallington where the paper was weighed"
                      <footer className="text-sm mt-2">— Mr Blackberry, <a href="https://www.bbc.co.uk/history/ww2peopleswar/stories/58/a8636358.shtml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">BBC WW2 People's War Archive</a></footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Girl Guides Section */}
              <CollapsibleSection 
                title="Girl Guides" 
                isOpen={openSection === 'girl-guides'}
                onToggle={handleSectionToggle}
                sectionId="girl-guides"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/scouts/guides-ww1.jpg"
                        alt="Guides in World War One"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Guides in World War One<br />
                        Image: IWM (Q 30969)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/girl-guide-uniform.jpg"
                        alt="Children during World War Two. Three of the girls near the front are in their Guide uniform."
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Children during World War Two. Three of the girls near the front are in their Guide uniform.<br />
                        Image: IWM (D 22058)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/girl-guides-playground.jpg"
                        alt="Four girls in the school playground. The girl second from the right is wearing her Guide badge."
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        Four girls in the school playground. The girl second from the right is wearing her Guide badge.<br />
                        Image: IWM (D 3160)
                      </figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/scouts/cotton-reel.jpg"
                        alt="This is a cotton reel like the ones that the Guides collected in 1941"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">
                        This is a cotton reel like the ones that the Guides collected in 1941.
                      </figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>The Guides have existed for almost as long as the Scouts, and they also played their part in the war effort.</p>
                    
                    <p>During World War One, Guides were recruited to be messengers for MI5, Britain's Security Service. They had to be aged 14-16, and <a href="https://www.mi5.gov.uk/news/defending-the-realm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">'of good standing, quick, cheerful and willing'</a>. Originally, the plan had been to use the Scouts in this role, but lots of the boys talked too much and didn't keep the secrets that they were trusted with!</p>
                    
                    <p>Girl Guides didn't work as spies during World War Two, but they did other important things to help on the Home Front. Just like the Scouts, Guides had lots of useful skills which they had learned before the war. Many of them had their Air Mechanic, Carpenter, First-Aid, Child Nurse or Needlewoman Badges, which were all important skills in a country at war.</p>
                    
                    <p>Guides handed out gas masks and helped to make sure they fitted correctly, dug bomb shelters in public parks, worked as messengers, and helped look after evacuees. They also painted kerbs white, organised sing-songs in bomb shelters, grew food, and worked with the ARP wardens, the Red Cross and the Home Guard to respond to emergencies.</p>
                    
                    <p>In 1941, the Guides were given a mission by the RAF - to collect 11,000 cotton reels. They weren't told why they were needed, but managed to collect over 42,000 within a week! We now know that these reels were used by British intelligence services to send secret messages and equipment to soldiers and spies on the front lines of the war. Some of them were even used to send tiny silk maps and German money.</p>
                    
                    <p>Guides and Scouts continued to earn badges throughout World War Two, and their contributions to the war effort have been recognised by future generations. The Girlguiding Remembrance Badge in 2022 was all about the cotton reel collection in 1941, introducing a whole new generation of girls to the work of the Guides in World War Two.</p>
                  </div>
                </div>
              </CollapsibleSection>
              
            </div>
          </div>
        ) : slug === 'junior-salvage-stewards' ? (
          <div>
            {/* Page Title */}
            <div className="prose prose-lg max-w-none mb-6">
              <h1>Learn More About The Junior Salvage Stewards</h1>
            </div>
            
            {/* Summary Section - Two Column Layout like Grace introduction */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Grace Image */}
              <div className="md:col-span-1 flex justify-center">
                <img 
                  src="/assets/character-image.png"
                  alt="Grace"
                  className="w-56 h-56 object-cover rounded-lg"
                />
              </div>
              
              {/* Right Column - Summary Text */}
              <div className="md:col-span-2">
                <div className="prose prose-lg">
                  <div className="text-lg leading-relaxed space-y-4">
                    {/* ADD YOUR INTRO TEXT HERE - Replace the placeholders below */}
                    <p>We've learnt so much from those objects! Thanks for helping me to investigate 😊.</p>
                    <p>Have a look through the sections below to learn more about life as a Junior Salvage Steward.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Collapsible Content Sections */}
            <div className="space-y-6">
              {/* Becoming a Cog Section */}
              <CollapsibleSection 
                title="Becoming a Cog" 
                isOpen={openSection === 'becoming-cog'}
                onToggle={handleSectionToggle}
                sectionId="becoming-cog"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (D 14074).jpg"
                        alt="Children collecting salvage materials during World War Two"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">WVS volunteers sorting salvage.<br />Image: IWM (D 14074)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/Cogs-in-machine.jpg"
                        alt="Illustration showing children as cogs in the salvage machine"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Cogs work together to make a machine work - if one cog is missing the whole machine stops working.</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (D 14019).jpg"
                        alt="Junior Salvage Stewards at work collecting materials"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Cogs working with a WVS volunteer to collect salvage.<br />Image: IWM (D 14019)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>Britain's salvage efforts didn't start with the Cogs. In December 1939, just a few months after the war started, the government launched the National Salvage Scheme. The Women's Voluntary Services (WVS) started a campaign to help, and the Cogs scheme was introduced a year later, at the end of 1940.</p>
                    
                    <p>Women from the WVS volunteered to go into schools and give talks on salvage to encourage children to join the scheme and become Junior Salvage Stewards. Lots of children liked the idea of being involved in the war effort, and many of them decided to take part. The Cog nickname came from the idea that children were small cogs in the national salvage machine, reflecting the way they all worked together to have a big impact.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "I am only a very small Cog in a very large wheel ploughing its way towards victory."
                      <footer className="text-sm mt-2">— WVS Bulletin No. 21, July 1941</footer>
                    </blockquote>
                    
                    <p>Children in the Junior Salvage Stewards were a variety of different ages. Many were aged 10 and 11, but some older children joined because they were still too young to join the military and wanted to be part of the war effort. The Cogs worked both alone and in groups and were often overseen by a local member of the WVS to make sure that everything ran smoothly.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "Are you a 'cog'? This is the question being at present exchanged amongst children of the town, and it is usually answered in the affirmative."
                      <footer className="text-sm mt-2">— Illustrated Berwick Journal, Thursday 11 February 1943, p. 3</footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Working as a Cog Section */}
              <CollapsibleSection 
                title="Working as a Cog" 
                isOpen={openSection === 'working-cog'}
                onToggle={handleSectionToggle}
                sectionId="working-cog"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (D 7560).jpg"
                        alt="Junior Salvage Stewards collecting materials"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">A woman putting her salvage out. Cogs helped their mothers with this job.<br />Image: IWM (D 7560)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (D 21562).jpg"
                        alt="Junior Salvage Stewards at work"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Junior Salvage Stewards loading a horse-drawn cart with salvage to be taken to the depot.<br />Image: IWM (D 21562)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (HU 36212).jpg"
                        alt="Cogs collecting salvage materials"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">A group of teenage Cogs carrying paper salvage.<br />Image: IWM (HU 36212)</figcaption>
                    </figure>
                    
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (D 14061).jpg"
                        alt="Junior Salvage Stewards working with salvage"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">Adults and children working together at a salvage depot.<br />Image: IWM (D 14061)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>Some Cogs worked as Salvage Stewards within their households, helping their mothers to separate their waste. Others collected waste from households on their street or in their local area, and sorted it themselves. Cogs often did their rounds on Saturdays, collecting the waste and taking it to local depots. From there, the salvage would be collected by the local authorities and sold to manufacturers, and the money went to the local community or to charities.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "An eleven-year-old boy is Dinnet's unofficial salvage officer… he and several of his schoolboy friends make regular house-to-house visits in the village and throughout the district."
                      <footer className="text-sm mt-2">— Aberdeen Press and Journal, Monday 12 January 1942, p. 3</footer>
                    </blockquote>
                    
                    <p>They collected a huge variety of materials, including paper, metal, rubber, fabric, and food scraps. These materials helped to keep the country running. Fabric scraps were particularly in demand: colourful rags were used to dye other fabrics, linen and calico were transformed into charts and paper, and stiff shirts and collars were turned into five pound notes!</p>
                    
                    <p>Collecting this salvage gave the Cogs a shared purpose and identity, with the scheme running throughout the country. They even had a song, called 'There'll Always Be A Dustbin'.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      <div className="whitespace-pre-line">
                        "There'll always be a dustbin,<br />
To save for victory,<br />
So treat it right and let it fight.<br />
For home and liberty.<br />
We'll win this war together,<br />
As easy as can be<br />
If dustbins mean as much to you<br />
As dustbins mean to me"
                      </div>
                      <footer className="text-sm mt-2">— Manchester Evening News, Thursday 4 September 1941, 'Dustbin 'Cogs''</footer>
                    </blockquote>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Rewards for Cogs Section */}
              <CollapsibleSection 
                title="Rewards for Cogs" 
                isOpen={openSection === 'rewards-cogs'}
                onToggle={handleSectionToggle}
                sectionId="rewards-cogs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-6">
                    <figure>
                      <img 
                        src="/topics/junior-salvage-stewards/IWM (D 14066).jpg"
                        alt="Junior Salvage Steward showing her cog badge"
                        className="w-full h-64 object-contain rounded-lg bg-gray-50"
                      />
                      <figcaption className="text-center mt-2 text-sm text-gray-500">A Junior Salvage Steward showing her cog badge to a friend.<br />Image: IWM (D 14066)</figcaption>
                    </figure>
                  </div>
                  <div>
                    <p>After six weeks of working as a Junior Salvage Steward, children were awarded a Cog badge. Over 190,000 of these badges were handed out over the course of the war. Sometimes these badges were presented to children by the local mayor, and the names of those being rewarded for their efforts were often listed in the local newspaper.</p>
                    
                    <p>Competitions were held in some towns and cities, and prizes were given to the Cogs who collected the most salvage. In one town in Lancashire, a Cog was awarded a prize for collecting 110 tyres, and in Ashbourne the Cogs in local boroughs competed to collect the most salvage.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "On Thursday last week, the Rev. B. Davis, chairman of the Dover Rural District Council Salvage Committee, presented a cup to Sydney Keeler as being the most conscientious 'Cog' for the Easter term. This cup is to be competed for each term in the future."
                      <footer className="text-sm mt-2">— Dover Express & East Kent News, Friday 24 April 1942</footer>
                    </blockquote>
                    
                    <p>Cogs weren't just rewarded with badges and trophies. Some WVS volunteers threw parties to thank the children for their efforts, and in Peterborough 1000 Cogs were taken to the cinema to show the city's appreciation.</p>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "Next month I am going to give them a garden party to show my appreciation."
                      <footer className="text-sm mt-2">— Daily Mirror, Saturday 27 June 1942, p. 2</footer>
                    </blockquote>
                    
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      "On Saturday morning 1,000 of the City's Salvage Cogs were entertained to a film show at the Broadway Kinema… in appreciation of their work during the salvage campaign."
                      <footer className="text-sm mt-2">— Peterborough Standard, Friday 29 May 1942, p.4</footer>
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
              <h1>Learn More About The {topicTitle}</h1>
              <p>This page will contain additional information about {topicTitle}.</p>
              <p>Content coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Activity Prompt Section */}
      <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200">
        <button
          onClick={() => setIsActivityPromptOpen(!isActivityPromptOpen)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors duration-200 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-blue-900">Reveal if using the suggested activity</h3>
          <svg 
            className={`w-5 h-5 text-blue-700 transition-transform duration-200 ${isActivityPromptOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isActivityPromptOpen && (
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="prose prose-lg max-w-none prose-strong:font-bold">
                <div className="text-gray-900">{activityPrompt}</div>
              </div>
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
