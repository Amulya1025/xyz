const form = document.getElementById('health-form');
const resultTitle = document.getElementById('results-title');
const resultIntro = document.getElementById('result-intro');
const resultContent = document.getElementById('result-content');
const scoreFill = document.getElementById('score-fill');

const guidance = {
  activity: {title: 'Movement', text: 'Try a comfortable walk or another activity you enjoy. Build up gradually and follow advice from a clinician if activity is difficult or unsafe for you.'},
  sleep: {title: 'Sleep routine', text: 'Keep a regular sleep and wake time and reduce late-night screen use. If sleep problems continue or affect daily life, discuss them with a healthcare professional.'},
  food: {title: 'Food variety', text: 'When possible, add affordable fruits, vegetables, beans, or other locally available nutritious foods to meals. Aim for steady, realistic changes rather than a strict diet.'},
  tobacco: {title: 'Tobacco support', text: 'Tobacco can increase health risks. Consider speaking with a healthcare professional about support and evidence-based ways to quit.'},
  stress: {title: 'Stress and well-being', text: 'Try short breaks, breathing exercises, movement, or talking with someone you trust. Seek professional support if stress feels overwhelming or continues.'},
  air: {title: 'Air quality', text: 'When practical, reduce exposure to smoke and dust, improve indoor ventilation when safe, and check local air-quality advice. A well-fitting mask may help in some dusty settings.'},
  age: {title: 'Preventive check-ups', text: 'Recommended screening depends on age, family history, and personal circumstances. Ask a healthcare professional which check-ups and vaccinations are appropriate for you.'},
  symptoms: {title: 'Symptoms deserve attention', text: 'New, persistent, worsening, or worrying symptoms should be discussed with a healthcare professional. Do not rely on this tool to judge the cause or seriousness.'}
};

function getValue(name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : '';
}

function makeFlag(title, text, symbol = '✓') {
  const item = document.createElement('div');
  item.className = 'flag';
  const icon = document.createElement('span');
  icon.className = 'flag-icon';
  icon.textContent = symbol;
  icon.setAttribute('aria-hidden', 'true');
  const body = document.createElement('div');
  const heading = document.createElement('strong');
  heading.textContent = title;
  const description = document.createElement('p');
  description.textContent = text;
  body.append(heading, description);
  item.append(icon, body);
  return item;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = Object.fromEntries(['age','activity','sleep','food','tobacco','stress','air','symptoms'].map(k => [k, getValue(k)]));
  const answered = Object.values(answers).filter(Boolean).length;
  if (answered === 0) {
    resultTitle.textContent = 'Add an answer to begin';
    resultIntro.textContent = 'Choose any question above, then select “Review my snapshot”.';
    resultContent.replaceChildren(makeFlag('Your choice', 'You can skip questions you do not want to answer.', 'i'));
    scoreFill.style.width = '0%';
    return;
  }

  let flags = [];
  let points = 0;
  const add = (key, pointsToAdd) => {
    flags.push(guidance[key]);
    points += pointsToAdd;
  };

  if (answers.activity === 'rare') add('activity', 2);
  else if (answers.activity === 'some') add('activity', 1);
  if (answers.sleep === 'low' || answers.sleep === 'high') add('sleep', 1);
  if (answers.food === 'rare') add('food', 2);
  else if (answers.food === 'sometimes') add('food', 1);
  if (answers.tobacco === 'yes') add('tobacco', 2);
  if (answers.stress === 'high') add('stress', 2);
  else if (answers.stress === 'medium') add('stress', 1);
  if (answers.air === 'high') add('air', 2);
  else if (answers.air === 'some') add('air', 1);
  if (answers.age === '40-59' || answers.age === '60plus') add('age', 1);
  if (answers.symptoms === 'yes' || answers.symptoms === 'unsure') add('symptoms', 2);

  // The indicator is an illustrative count of selected lifestyle/environment flags,
  // not a clinically validated probability or prediction of disease.
  const maxPoints = 14;
  const percent = Math.min(100, Math.round(points / maxPoints * 100));
  scoreFill.style.width = `${percent}%`;
  resultContent.replaceChildren();

  let label, badgeClass, intro;
  if (answers.symptoms === 'yes' || answers.symptoms === 'unsure') {
    label = 'Symptoms need attention';
    badgeClass = 'priority';
    intro = 'Your answers include a symptom concern. Please arrange appropriate medical advice rather than relying on this score.';
  } else if (points >= 5) {
    label = 'Several areas to review';
    badgeClass = 'review';
    intro = 'Some answers point to habits or exposures you may want to discuss or improve. This is not a diagnosis or a prediction of illness.';
  } else {
    label = 'A few areas to consider';
    badgeClass = '';
    intro = 'Your answers show fewer selected lifestyle flags in this check-in. This does not mean that you are free of health risks.';
  }

  resultTitle.textContent = label;
  resultIntro.textContent = intro;
  const badge = document.createElement('span');
  badge.className = `result-badge ${badgeClass}`;
  badge.textContent = `${answered} of 8 questions answered`;
  resultContent.append(badge);

  const heading = document.createElement('h3');
  heading.textContent = flags.length ? 'Suggested next steps' : 'Keep supporting your well-being';
  resultContent.append(heading);
  const list = document.createElement('div');
  list.className = 'flag-list';
  if (!flags.length) {
    list.append(makeFlag('Keep up healthy routines', 'Continue habits that support your well-being, and follow age- and history-appropriate preventive care advice.'));
  } else {
    flags.forEach(item => list.append(makeFlag(item.title, item.text)));
  }
  resultContent.append(list);

  const note = document.createElement('p');
  note.className = 'small-muted';
  note.style.cssText = 'font-size:10px;color:#718583;margin:13px 0 0';
  note.textContent = 'Indicator: illustrative only. It is not a percentage chance of disease and has not been medically validated.';
  resultContent.append(note);
});

form.addEventListener('reset', () => {
  window.setTimeout(() => {
    resultTitle.textContent = 'Ready when you are';
    resultIntro.textContent = 'Complete the check-in to see a simple summary of habits and possible next steps.';
    resultContent.innerHTML = '<div class="empty-tip"><strong>What happens next?</strong><p>We’ll identify answers that may be worth reviewing and suggest practical, general prevention steps.</p></div>';
    scoreFill.style.width = '0%';
  }, 0);
});

document.getElementById('print-btn').addEventListener('click', () => window.print());
