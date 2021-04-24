import Messages from '../../Messages';
import iconLangEnable from '../../assets/img/icon-lang-enable.png';
import lightFull from '../../assets/img/icon-light-hi.png';
import lightLight from '../../assets/img/icon-light-lo.png';
import lightOff from '../../assets/img/icon-light-off.png';
import volumeLoud from '../../assets/img/icon-vol-hi-enable.png';
import volumeLow from '../../assets/img/icon-vol-lo-enable.png';
import volumeOff from '../../assets/img/icon-vol-mute.png';
import leavingOffDisabled from '../../assets/img/icon48-pt-leaving-off-disable.png';
import leavingOff from '../../assets/img/icon48-pt-leaving-off-enable.png';
import leavingOnDisabled from '../../assets/img/icon48-pt-leaving-on-disable.png';
import leavingOn from '../../assets/img/icon48-pt-leaving-on-enable.png';
import reposOffDisabled from '../../assets/img/icon48-pt-repos-off-disable.png';
import reposOff from '../../assets/img/icon48-pt-repos-off-enable.png';
import reposOnDisabled from '../../assets/img/icon48-pt-repos-on-disable.png';
import reposOn from '../../assets/img/icon48-pt-repos-on-enable.png';
import sittingupOffDisabled from '../../assets/img/icon48-pt-sittingup-off-disable.png';
import sittingupOff from '../../assets/img/icon48-pt-sittingup-off-enable.png';
import sittingupOnDisabled from '../../assets/img/icon48-pt-sittingup-on-disable.png';
import sittingupOn from '../../assets/img/icon48-pt-sittingup-on-enable.png';
import stirringOffDisabled from '../../assets/img/icon48-pt-stirring-off-disable.png';
import stirringOff from '../../assets/img/icon48-pt-stirring-off-enable.png';
import stirringOnDisabled from '../../assets/img/icon48-pt-stirring-on-disable.png';
import stirringOn from '../../assets/img/icon48-pt-stirring-on-enable.png';
import padR from '../../assets/img/img-padlineside.png';
import padL from '../../assets/img/img-padlineside_L.PNG';

export const BoxSettingsDisplay = {
  led: {
    Close: {
      img: lightOff,
      label: Messages.Text_AlertMessage_LED_Close,
    },
    Light: {
      img: lightLight,
      label: Messages.Text_AlertMessage_LED_Light,
    },
    Full: {
      img: lightFull,
      label: Messages.Text_AlertMessage_LED_Full,
    },
  },
  volume: {
    No: {
      img: volumeOff,
      label: Messages.Text_AlertMessage_Volume_No,
    },
    Low: {
      img: volumeLow,
      label: Messages.Text_AlertMessage_Volume_Low,
    },
    Loud: {
      img: volumeLoud,
      label: Messages.Text_AlertMessage_Volume_Loud,
    },
  },
  language: {
    English: {
      img: iconLangEnable,
      label: Messages.Text_AlertMessage_Language_English,
    },
    Spanish: {
      img: iconLangEnable,
      label: Messages.Text_AlertMessage_Language_Spanish,
    },
    Chinese: {
      img: iconLangEnable,
      label: Messages.Text_AlertMessage_Language_Chinese,
    },
    Taiwanese: {
      img: iconLangEnable,
      label: Messages.Text_AlertMessage_Language_Taiwanese,
    },
    Music: {
      img: iconLangEnable,
      label: Messages.Text_AlertMessage_Language_Music,
    },
    Other: {
      img: iconLangEnable,
      label: Messages.Text_AlertMessage_Language_Other,
    },
  },
  sitUpAudio: {
    true: {
      img: sittingupOn,
      label: Messages.Text_BedSide_Settings_SittingUpAlert1,
    },
    false: {
      img: sittingupOff,
      label: Messages.Text_BedSide_Settings_SittingUpAlert1,
    }
  },
  padSide: {
    L: {
      img: padR,
      label: Messages.Text_BedSide_Settings_CableOrientationLeft,
    },
    R: {
      img: padL,
      label: Messages.Text_BedSide_Settings_CableOrientationRight,
    }
  }
}

export const DashboardAlertsDisplay = {
  stirring: {
    true: {
      // alertOn
      true: {
        img: stirringOn,
        label: Messages.Text_BedSide_Settings_Stirring
      },
      false: {
        img: stirringOnDisabled,
        label: Messages.Text_BedSide_Settings_Stirring
      }
    },
    false: {
      // alertOn
      true: {
        img: stirringOff,
        label: Messages.Text_BedSide_Settings_Stirring
      },
      false: {
        img: stirringOffDisabled,
        label: Messages.Text_BedSide_Settings_Stirring
      }
    }
  },
  sittingUp: {
    true: {
      // alertOn
      true: {
        img: sittingupOn,
        label: Messages.Text_BedSide_Settings_SittingUp
      },
      false: {
        img: sittingupOnDisabled,
        label: Messages.Text_BedSide_Settings_SittingUp
      }
    },
    false: {
      // alertOn
      true: {
        img: sittingupOff,
        label: Messages.Text_BedSide_Settings_SittingUp
      },
      false: {
        img: sittingupOffDisabled,
        label: Messages.Text_BedSide_Settings_SittingUp
      }
    }
  },
  leaving: {
    true: {
      // alertOn
      true: {
        img: leavingOn,
        label: Messages.Text_BedSide_Settings_Leaving
      },
      false: {
        img: leavingOnDisabled,
        label: Messages.Text_BedSide_Settings_Leaving
      }
    },
    false: {
      // alertOn
      true: {
        img: leavingOff,
        label: Messages.Text_BedSide_Settings_Leaving
      },
      false: {
        img: leavingOffDisabled,
        label: Messages.Text_BedSide_Settings_Leaving
      }
    }
  },
  reposition: {
    true: {
      // alertOn
      true: {
        img: reposOn,
        label: Messages.Text_BedSide_Settings_Reposition
      },
      false: {
        img: reposOnDisabled,
        label: Messages.Text_BedSide_Settings_Reposition
      }
    },
    false: {
      // alertOn
      true: {
        img: reposOff,
        label: Messages.Text_BedSide_Settings_Reposition
      },
      false: {
        img: reposOffDisabled,
        label: Messages.Text_BedSide_Settings_Reposition
      }
    }
  },
}
