const EFFECTS = {

  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
  },

  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },

  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },

  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const DEFAULT_EFFECT = EFFECTS.none;
const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectValueElement = formElement.querySelector('.effect-level__value');
const sliderElement = formElement.querySelector('.effect-level__slider');

let selectedEffect = DEFAULT_EFFECT;

const isDefault = () => selectedEffect === DEFAULT_EFFECT;

const updateEffect = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max
    },
    start: selectedEffect.max,
    step: selectedEffect.step
  });

  imageElement.className = '';
  sliderElement.classList.remove('hidden');
  if (isDefault()) {
    sliderElement.classList.add('hidden');
    return;
  }
  imageElement.classList.add(`effects__preview--${selectedEffect.name}`);
};

const resetEffect = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateEffect();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

updateEffect();

const onFormChange = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    selectedEffect = EFFECTS[evt.target.value];
    updateEffect();
  }
};

const onSliderUpdate = () => {
  imageElement.style.filter = 'none';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  effectValueElement.value = sliderValue;
  imageElement.style.filter = `${selectedEffect.filter}(${sliderValue}${selectedEffect.unit})`;
};

formElement.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffect };
