import React, { useEffect, useRef } from 'react';
import './style.css';

function App() {

  const background1 = useRef(null)
  const background2 = useRef(null)
  const foreground1 = useRef(null)
  const foreground2 = useRef(null)
  const redQueen_and_alice_sprite = useRef(null)

  useEffect(() => {
    const sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' }
    ];

    const sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity
    };

    const sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity
    };



    const background1Movement = background1.current.animate(
      sceneryFrames, sceneryTimingBackground);

    const background2Movement = background2.current.animate(
      sceneryFrames, sceneryTimingBackground);


    const foreground1Movement = foreground1.current.animate(
      sceneryFrames, sceneryTimingForeground);

    const foreground2Movement = foreground2.current.animate(
      sceneryFrames, sceneryTimingForeground);

    const spriteFrames = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' }
    ];


    const redQueen_alice = redQueen_and_alice_sprite.current.animate(
      spriteFrames, {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    });

    /* Alice tires so easily! 
      Every so many seconds, reduce their playback rate so they slow a little. 
    */
    const sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

    const adjustBackgroundPlayback = function () {
      if (redQueen_alice.playbackRate < .8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2 * -1;
        });
      } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = redQueen_alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    }
    adjustBackgroundPlayback();

    /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */
    setInterval(function () {
      /* Set decay */
      if (redQueen_alice.playbackRate > .4) {
        redQueen_alice.playbackRate *= .9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    const goFaster = function () {
      /* But you can speed them up by giving the screen a click or a tap. */
      redQueen_alice.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    }

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);
  }, [])
  return (
    <div className="wrapper">
      <div className="sky" />
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="redQueen_and_alice_sprite" ref={redQueen_and_alice_sprite} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={foreground1}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background1" ref={background1}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background2" ref={background2}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />
        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>

  );
}

export default App;
