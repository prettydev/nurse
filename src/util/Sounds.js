import alertSound from '../assets/media/alert_sound.mp3';
import repositionSound from '../assets/media/reposition_sound.mp3';

export const Sounds = {
  Reposition: new Audio(),
  Alert: new Audio(),
};

// NOTE: Safari does not allow Audio to autoplay, it must be initiated as part of a user action.
// Thus when the user clicks the Login button we setup our sounds to be played later by the dashboard.
// This is basically considered a "replay" of a granted Audio.
export function setupSoundsBasedOnUserInteraction() {
  Sounds.Reposition.play().catch(ignoreError);
  Sounds.Alert.play().catch(ignoreError);
  Sounds.Reposition.src = repositionSound;
  Sounds.Alert.src = alertSound;
}

function ignoreError() {}
