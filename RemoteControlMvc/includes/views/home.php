<?php 
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>


   <table class="remotetable">
      <tr class="headerRemote">
         <td colspan="2"><div id="bh">
               <nav>
                  <img
                     src="assets/img/home.png"
                     alt="Home"
                     data-action="home"
                     id="home"
                     class="roundbutton xbmcSimpleAction"
                  /> <img
                     src="assets/img/tv.png"
                     alt="Pvr"
                     data-method="GUI.ActivateWindow"
                     data-params='{"window":"pvr"}'
                     class="lruds roundbutton xbmcAction"
                  /> <img
                     src="assets/img/video.png"
                     alt="Vid�o"
                     data-method="GUI.ActivateWindow"
                     data-params='{"window":"video"}'
                     class="lruds roundbutton xbmcAction"
                  /> <img
                     src="assets/img/music.png"
                     alt="Music"
                     data-method="GUI.ActivateWindow"
                     data-params='{"window":"music"}'
                     class="lruds roundbutton xbmcAction"
                  /> <img
                     src="assets/img/setting.png"
                     alt="Settings"
                     data-method="GUI.ActivateWindow"
                     data-params='{"window":"settings"}'
                     class="roundbutton xbmcAction"
                  />
                  <img
                     src="assets/img/refresh.png"
                     alt="Reload Pvr"
                     data-method="Addons.ExecuteAddon"
                     data-params='{"wait":false,"addonid":"service.refreshchannel"}'
                     class="roundbutton xbmcAction pvrscan"
                  />
                  
               </nav>
            </div></td>
      </tr>
      <tr class="bodyRemote">
         <td><div>
               <a
                  id="vup"
                  data-action="volumeup"
                  class="volbutton xbmcSimpleAction"
               ></a>
            </div>
            <div>
               <a
                  id="mute"
                  class="volbutton xbmcSimpleAction"
                  data-action="mute"
               ></a>
            </div>
            <div>
               <a
                  id="vdn"
                  data-action="volumedown"
                  class="volbutton xbmcSimpleAction"
               ></a>
            </div>
         </td>
         <td>
            <div id="dup">
               <a
                  id="back"
                  data-action="back"
                  class="xbmcSimpleAction"
               ></a> <a
                  id="up"
                  data-action="up"
                  class="xbmcSimpleAction"
               ></a> <a
                  id="home" data-method="Input.ExecuteAction" data-params='{"action":"fullscreen"}'
                  class="xbmcAction"
               ></a>
            </div>
            <div id="lor">
               <a data-action="left"
                  id="left"
                  class="xbmcSimpleAction"
               ></a> <a
                  id="ok"
                  data-action="select"
                  id="select"
                  class="xbmcSimpleAction"
               ></a> <a
                  id="osd"
                  data-action="osd"
                  id="select"
                  class="xbmcSimpleAction"
                  style="display: none;"
               ></a> <a
                  id="right"
                  data-action="right"
                  class="xbmcSimpleAction"
               ></a>
            </div>
            <div id="ddown">
               <a
                  id="contextmenu"
                  data-action="contextmenu"
                  class="xbmcSimpleAction"
               ></a> <a
                  id="down"
                  data-action="down"
                  class="xbmcSimpleAction"
               ></a> <a
                  id="info"
                  data-action="info"
                  class="xbmcSimpleAction"
               ></a>
            </div>
         </td>
      </tr>
<!--       <tr> -->
<!--          <td colspan="2"><div id="rpf"> -->
<!--                <a -->
<!--                   id="pvr" -->
<!--                   data-method="Addons.SetAddonEnabled" -->
<!--                   data-params='{"window":"pvr.iptvsimple","enabled":true}' -->
<!--                   class="lruds pvrscan xbmcAction" -->
<!--                ></a> <a -->
<!--                   id="rewind" -->
<!--                   class="playeraction " -->
<!--                ></a> <a -->
<!--                   id="play" -->
<!--                   class="playeraction " -->
<!--                ></a> <a -->
<!--                   id="fastforward" -->
<!--                   class="playeraction " -->
<!--                ></a> -->
<!--             </div> -->
<!--             <div id="kbcontainer"> -->
<!--                <ul id="keyboard"> -->
<!--                   <li class="symbol"><span class="off">`</span> <span class="on">~</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">1</span> <span class="on">!</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">2</span> <span class="on">@</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">3</span> <span class="on">#</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">4</span> <span class="on">$</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">5</span> <span class="on">%</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">6</span> <span class="on">^</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">7</span> <span class="on">&amp;</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">8</span> <span class="on">*</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">9</span> <span class="on">(</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">0</span> <span class="on">)</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">-</span> <span class="on">_</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">=</span> <span class="on">+</span> -->
<!--                   </li> -->
                  <!--<li class="delete lastitem">delete</li>-->
<!--                   <li class="tab">tab</li> -->
<!--                   <li class="letter">q</li> -->
<!--                   <li class="letter">w</li> -->
<!--                   <li class="letter">e</li> -->
<!--                   <li class="letter">r</li> -->
<!--                   <li class="letter">t</li> -->
<!--                   <li class="letter">y</li> -->
<!--                   <li class="letter">u</li> -->
<!--                   <li class="letter">i</li> -->
<!--                   <li class="letter">o</li> -->
<!--                   <li class="letter">p</li> -->
<!--                   <li class="symbol"><span class="off">[</span> <span class="on">{</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">]</span> <span class="on">}</span> -->
<!--                   </li> -->
<!--                   <li class="symbol lastitem"><span class="off">\</span> <span class="on">|</span> -->
<!--                   </li> -->
<!--                   <li class="capslock">caps lock</li> -->
<!--                   <li class="letter">a</li> -->
<!--                   <li class="letter">s</li> -->
<!--                   <li class="letter">d</li> -->
<!--                   <li class="letter">f</li> -->
<!--                   <li class="letter">g</li> -->
<!--                   <li class="letter">h</li> -->
<!--                   <li class="letter">j</li> -->
<!--                   <li class="letter">k</li> -->
<!--                   <li class="letter">l</li> -->
<!--                   <li class="symbol"><span class="off">;</span> <span class="on">:</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">&#39;</span> <span class="on">&quot;</span> -->
<!--                   </li> -->
                  <!--<li class="return lastitem">return</li>-->
<!--                   <li class="left-shift">shift</li> -->
<!--                   <li class="letter">z</li> -->
<!--                   <li class="letter">x</li> -->
<!--                   <li class="letter">c</li> -->
<!--                   <li class="letter">v</li> -->
<!--                   <li class="letter">b</li> -->
<!--                   <li class="letter">n</li> -->
<!--                   <li class="letter">m</li> -->
<!--                   <li class="symbol"><span class="off">,</span> <span class="on">&lt;</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">.</span> <span class="on">&gt;</span> -->
<!--                   </li> -->
<!--                   <li class="symbol"><span class="off">/</span> <span class="on">?</span> -->
<!--                   </li> -->
<!--                   <li class="right-shift lastitem">shift</li> -->
<!--                   <li class="space lastitem">&#160;</li> -->
<!--                </ul> -->
<!--          </div> -->
<!--          </td> -->
<!--       </tr> -->
      
   </table>
  



<?php render('_footer')?>