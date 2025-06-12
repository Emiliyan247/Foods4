const session = pl.create();

const knowledge = `
car(bmw_3_series).
car(audi_a6).
car(toyota_corolla).
car(ford_f150).
car(tesla_model_s).
car(jeep_wrangler).
car(porsche_911).
car(mercedes_s_class).
car(nissan_leaf).
car(honda_civic).
car(chevrolet_camaro).
car(subaru_outback).

electric(tesla_model_s).
electric(nissan_leaf).

diesel(bmw_3_series).
diesel(audi_a6).
diesel(mercedes_s_class).
diesel(subaru_outback).

petrol(toyota_corolla).
petrol(porsche_911).
petrol(jeep_wrangler).
petrol(ford_f150).
petrol(honda_civic).
petrol(chevrolet_camaro).

suv(jeep_wrangler).
suv(ford_f150).
suv(subaru_outback).

sedan(bmw_3_series).
sedan(audi_a6).
sedan(toyota_corolla).
sedan(tesla_model_s).
sedan(mercedes_s_class).
sedan(nissan_leaf).
sedan(honda_civic).

sports_car(porsche_911).
sports_car(chevrolet_camaro).

luxury(bmw_3_series).
luxury(audi_a6).
luxury(tesla_model_s).
luxury(porsche_911).
luxury(mercedes_s_class).

made_by(bmw_3_series, bmw).
made_by(audi_a6, audi).
made_by(toyota_corolla, toyota).
made_by(ford_f150, ford).
made_by(tesla_model_s, tesla).
made_by(jeep_wrangler, jeep).
made_by(porsche_911, porsche).
made_by(mercedes_s_class, mercedes).
made_by(nissan_leaf, nissan).
made_by(honda_civic, honda).
made_by(chevrolet_camaro, chevrolet).
made_by(subaru_outback, subaru).

is_electric(X) :- electric(X).
is_petrol(X) :- petrol(X).
is_diesel(X) :- diesel(X).

is_sedan(X) :- sedan(X).
is_suv(X) :- suv(X).
is_sports_car(X) :- sports_car(X).

is_luxury(X) :- luxury(X).

manufacturer(X, Y) :- made_by(X, Y).

is_environment_friendly(X) :- electric(X).
is_gas_guzzler(X) :- suv(X), petrol(X).
is_family_car(X) :- sedan(X), \\+ sports_car(X).
is_offroad_vehicle(X) :- suv(X), made_by(X, jeep).
`;

session.consult(knowledge);

const carAnimations = {
  bmw_3_series: 'https://media.giphy.com/media/llarwdtFqG63IlqUR1/giphy.gif',
  audi_a6: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
  toyota_corolla: 'https://media.giphy.com/media/j0eJ4P8OH9vDOMcFep/giphy.gif',
  ford_f150: 'https://media.giphy.com/media/xT4uQulxzV39haRFjG/giphy.gif',
  tesla_model_s: 'https://media.giphy.com/media/I4CqXWFp1cme/giphy.gif',
  jeep_wrangler: 'https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.gif',
  porsche_911: 'https://media.giphy.com/media/Wn74RUT0vjnoU98Hnt/giphy.gif',
  mercedes_s_class: 'https://media.giphy.com/media/3o7TKsQYv7jUX0OHhC/giphy.gif',
  nissan_leaf: 'https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif',
  honda_civic: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjFydTJraWc3a3AzYndxczh5c2dkZ3QzN2N4ejhiYmxubWphbHh0eCZlcD12MV8zMGJpYmc4ZTI2a2l5ZDVub2pmZHJsc3BqbQ/giphy.gif',
  chevrolet_camaro: 'https://media.giphy.com/media/3orieRzVQfZ3A5Tj4E/giphy.gif',
  subaru_outback: 'https://media.giphy.com/media/l0MYKDrkN8rFShzOo/giphy.gif'
};

function runProlog() {
  const input = document.getElementById("prolog-input").value.trim();
  const resultDiv = document.getElementById("result");
  const animDiv = document.getElementById("car-animation");

  resultDiv.textContent = "";
  animDiv.innerHTML = "";

  session.query(input);

  session.answer(answer => {
    if (answer === false) {
      resultDiv.textContent = "Няма резултати за тази заявка.";
      return;
    }

    const formatted = pl.format_answer(answer);
    resultDiv.textContent = formatted;

    const regex = /X = ([a-zA-Z0-9_]+)/;
    const match = formatted.match(regex);

    if (match && match[1]) {
      const car = match[1];
      const gifUrl = carAnimations[car] || 'https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif';
      animDiv.innerHTML = `
        <img src="${gifUrl}" class="car-gif" alt="${car}" />
        <p style="color:#0ff; font-size:1.1rem;">Показан модел: <strong>${car}</strong></p>
      `;
    }
  });
}

function clearAll() {
  document.getElementById("prolog-input").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("car-animation").innerHTML = "";
}
