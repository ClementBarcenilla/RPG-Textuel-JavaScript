const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "Vous vous réveillez seul en pleine journée dans une fôret. Vos compagnons vous ont oublié et vous devez sortir de cette fôret à tout prix. Vous trouvez a vos côtés une carte, une corde et une petite gourde d'eau. Cependant vous ne disposez pas de sac et vous ne pouvez prendre qu'un seul des 3 objets.",
    options: [
      {
        text: "Prendre la carte.",
        setState: { carte: true },
        nextText: 2
      },
      {
        text: 'Prendre la corde.',
        setState: { corde: true},
        nextText: 2
      },
      {
        text: 'Prendre la gourde.',
        setState: { fiole: true},
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: "Vous continuer sur ce qui semble être un chemin jusqu'à rencontrer un vieil homme, ce dernier vous propose de faire un échange pour 10 pièces d'or.",
    options: [
      {
        text: 'Echanger la corde.',
        requiredState: (currentState) => currentState.corde,
        setState: { corde: false, piece: true },
        nextText: 5
      },
      {
        text: 'Echanger la carte.',
        requiredState: (currentState) => currentState.carte,
        setState: { carte: false, piece: true },
        nextText: 5
      },
      {
        text: 'Refuser la proposition.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "Malgrè tout, le vieil homme vous indique que si vous souhaitez passer la nuit au chaud, il y une auberge non loin d'ici mais il faut cependant sortir du chemin sur lequel vous êtes. Après avoir continuer votre route pendant 2 heures, la nuit va bientôt tomber et vous commencer à être fatigué. Vous commencez donc à chercher un endroit où dormir jusqu'à tomber sur une grotte. Cependant vous vous rappelez que 100 mètres plus tôt vous aviez passé un grand Chêne que vous pourriez essayer d'esclader pour y dormir.",
    options: [
      {
        text: 'Dormir dans la grotte.',
        nextText: 4
      },
      {
        text: "Revenir sur vos pas et essayer d'escalader le Chêne.",
        nextText: 9
      },
      {
        text: "Suivre le conseil du vieil homme.",
        nextText: 66
      }
    ]
  },
  {
    id: 33,
    text: "Après avoir continuer votre route pendant 2 heures, la nuit va bientôt tomber et vous commencez à être fatigué. Vous commencez donc à chercher un endroit où dormir jusqu'à tomber sur une grotte. Cependant vous vous rappelez que 100 mètres plus tôt vous aviez passé un grand Chêne que vous pourriez essayer d'esclader pour y dormir.",
    options: [
      {
        text: 'Dormir dans la grotte.',
        nextText: 4
      },
      {
        text: "Revenir sur vos pas et essayer d'escalader le Chêne.",
        nextText: 9
      }
    ]
  },
  {
    id: 4,
    text: "Vous vous réveillez bien reposé et prêt à continuer votre chemin. Vous avez le choix entre continuer sur le chemin que vous suiviez hier ou vous pouvez choisir d'explorer le chemin qui s'enfonce dans la grotte.",
    options: [
      {
        text: "Continuer sur le chemin d'hier.",
        nextText: 7
      },
      {
        text: "Explorer le chemin qui s'enfonce dans la grotte.",
        nextText: 8
      }
    ]
  },
  {
    id: 5,
    text: "Après avoir fait l'échange avec le vieille homme, ce dernier vous indique une auberge en dehors des chemins où pourriez passer la nuit.",
    options: [
      {
        text: "Sortir du chemin pour aller vers l'auberge.",
        nextText: 66
      },
      {
        text: 'Continuer votre route.',
        nextText: 33
      }
    ]
  },
  {
    id: 66,
    text: "Cela fait longtemps que vous chercher l'auberge et vous pensez être perdu.",
    options: [
      {
        text: "Regarder votre carte.",
        requiredState: (currentState) => currentState.carte,
        nextText: 36
      },
      {
        text: "Essayer de trouver l'auberge.",
        nextText: 6
      }
    ]
  },
  {
    id: 36,
    text: "Vous regardez votre carte et vous vous appercevez que l'auberge en question est en faite gérée pas un couple de cannibale.",
    options: [
      {
        text: "Regagner le chemin!",
        nextText: 33
      }
    ]
  },
  {
    id: 6,
    text: "Après avoir cherché l'auberge pendant presque 2 heures, vous êtes maintenant très fatigué et il fait nuit noire, vous vous apprétez à dormir au pied d'un arbre quand vous appercevez enfin l'auberge. Vous entrez pour demander une chambre. Le maître des lieux vous propose en attendant que sa femme prépare la chambre de boire une infusion qu'ils font eux même. Vous la buvez et vous vous sentez immédiatement mal. Vous ne sentez plus vos mains et tentez alors d'attaquer le gérant mais vous perdez connaissance. Le couple qui gère l'auberge sont enfaite des cannibales et vont vous manger.",
    options: [
      {
        text: 'Recommencer.',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: "Après avoir marcher sur le chemin pendant plusieurs heures, vous commencez à avoir faim lorsque vous appercevez sur votre droite un buisson avec des baies rouge et au loin une petite ferme au milieu de la fôret.",
    options: [
      {
        text: "Manger les baies.",
        nextText: 11
      },
      {
        text: "Aller jusqu'à le ferme.",
        nextText: 12
      },
      {
        text: "Continuer votre chemin sans manger.",
        nextText: 13
      }
    ]
  },
  {
    id: 8,
    text: "Cela fait maintenant 1 heure que vous enfoncez dans la grotte quand vous tomber face face avec un Gros Ratus, sans armes vous ne pouvez pas vous défendre et fuir et hors de question, le Gros Ratus est trop rapide et vous tue instantanèment.",
    options: [
      {
        text: 'Recommencer.',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: "Vous vous apprétez à escalader le Chène quand vous entender une bande de Ratus s'approcher, n'ayant pas d'arme vous tentez d'escalader l'arbre.",
    options: [
      {
        text: "Utiliser la corde.",
        requiredState: (currentState) => currentState.corde,
        nextText: 99
      },
      {
        text: "Escalader l'arbre à mains nues.",
        nextText: 77
      }
    ]
  },
  {
    id: 77,
    text: "Vous vous réveillé à moitié reposé mais avec ce qui vous est arrivé hier soir, vous pensez que de trouver une arme grâce aux Ratus ne serait pas une mauvaise idée.",
    options: [
      {
        text: "Tenter de trouver une arme.",
        nextText: 88
      }
    ]
  },
  {
    id: 99,
    text: "Vous arrivez à accrocher la corde à une des plus haute branche et commencez à escalder mais arrivé à mis hauteur la corde casse et vous vous cassez le cou.",
    options: [
      {
        text: 'Recommencer.',
        nextText: -1
      }
    ]
  },
  {
    id: 88,
    text: "Vous arrivez à retrouver la trace des Ratus et arrivez à leur camp, vous commencez alors à chercher les bordures de ce dernier pour une arme mais ne parvenez pas à en trouver.",
    options: [
      {
        text: "S'enfoncer dans le camp.",
        nextText: 10
      },
      {
        text: "Renoncer à l'arme et revenir sur vos pas.",
        nextText: 7
      }
    ]
  },
  {
    id: 10,
    text: "Après vous être enfoncé dans le camps vous tombé nez à nez avec un Gros Ratus, ce dernier ne vous laisse aucune chance et vous tue sur le champs.",
    options: [
      {
        text: 'Recommencer.',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "Après avoir mangé les baies vous vous sentez bien mieux et continuer votre chemin.",
    options: [
      {
        text: "Continuer votre route.",
        nextText: 14
      }
    ]
  },
  {
    id: 12,
    text: "Une fois arrivé à la ferme vous vous approchez du fermier et lui demandez si il n'a pas de quoi manger. Ce dernier vous répond que oui mais que ce n'est pas gratuit. S'en vient alors 3 autre fermiers armés de fourche. N'ayant pas d'arme pour vous défendre vous n'avez pas beaucoup de choix qui s'offre à vous.",
    options: [
      {
        text: "Acheter un poulet rôti pour 10 pièces d'or.",
        requiredState: (currentState) => currentState.piece,
        nextText: 14
      },
      {
        text: "Continuer votre route.",
        nextText: 13
      },
      {
        text: "Tenter de voler un poulet.",
        nextText: 17
      }
    ]
  },
  {
    id: 13,
    text: "N'ayant pas mangé, vous ne vous sentez pas bien et décidé de vous allonger pour faire une courte pause mais durant cette dernière les Ratus vous ont trouvé et vous tuent durant votre sommeil.",
    options: [
      {
        text: "Recommencer.",
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: "Après ce repas vous estimez que vous serez largement sorti de cette fôret d'ici la tombée de la nuit mais avec ce repas pensez que vous pouvez prendre une pause pour digérer.",
    options: [
      {
        text: "Continuer votre route.",
        nextText: 15
      },
      {
        text: "Faire une sieste pour digérer.",
        nextText: 16
      }
    ]
  },
  {
    id: 15,
    text: "Apres quelques heures de marche, vous appercevez enfin la fin de la fôret.",
    options: [
      {
        text: 'Félicitations! Jouer à nouveau.',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: "Vous vous allonger au pied d'un arbre et vous endormez. Durant votre sommeil, un Gros Ratus et son escouade de Ratus vous a trouvez et vous tuent sans aucune peine. Dommage vous étiez presque sorti de la fôret...",
    options: [
      {
        text: 'Recommencer.',
        nextText: -1
      }
    ]
  },
  {
    id: 17,
    text: "Vous vous approchez silencieusement du poulailler et réussissez à capturer un poulet mais en sortant du poullalier un des fermiers a entendu les poulets et vous surprend. Il menace violamment avec sa fourche.",
    options: [
      {
        text: "Tenter de fuir avec le poulet.",
        nextText: 18
      },
      {
        text: "Poser le poulet et partir.",
        nextText: 19
      }
    ]
  },
  {
    id: 18,
    text: "Vous faites mine de poser le poulet et tenter de pousser le fermier afin de fuir, le fermier évite votre attaque et vous embroche avec sa fourche, vous tuant sur le coup.",
    options: [
      {
        text: 'Recommencer.',
        nextText: -1
      }
    ]
  },
  {
    id: 19,
    text: "Vous renoncer d'attaquer ce fermier et déposez le poulet avant de reprendre votre chemin affamé.",
    options: [
      {
        text: "Reprendre votre chemin.",
        nextText: 13
      }
    ]
  },
]

startGame()
