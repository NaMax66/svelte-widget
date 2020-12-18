<svelte:options tag=avtocod-widget immutable={true} />

<form on:submit|preventDefault="{handleSubmit}" target="_blank" class="avtocod-form" action="https://avtocod.ru/?a_aid={refid}&chan={chan}">
  <div class="avtocod-form__header">Проверить историю авто на сервисе Автокод</div>
  <div class="avtocod-form__body">
    <span>
      <input
        on:click={()=>{handleClick(0)}}
        type="button" value="VIN"
        class="avtocod-form__toggle-btn avtocod-form__toggle-btn_vin"
        class:avtocod-form__toggle-btn_active={currentIdentifier.type === 'VIN'}
      >
      <input
        on:click={()=>{handleClick(1)}}
        type="button" value="Госномер"
        class="avtocod-form__toggle-btn avtocod-form__toggle-btn_grz"
        class:avtocod-form__toggle-btn_active={currentIdentifier.type === 'GRZ'}
      >
    </span>
    <div class="input-wrap">
      <input
        class="avtocod-form__input"
        placeholder="{currentIdentifier.placeholder}"
        on:change={handleOnChange}
        bind:value={identifier}
      >
      <div class="arrow-box" hidden="{!isHintShown}">
        <div class="arrow-box__text">
          {#if currentIdentifier.type === 'VIN'}
            <div>Неверный формат VIN</div>
              VIN — уникальный идентификационный номер автомобиля. Содержит информацию о годе выпуска, производителе и    характеристиках автомобиля. Состоит из 17 символов (латинские буквы и цифры).
          {:else}
            <div>Неверный формат госномера</div>
            Госномер — индивидуальный регистрационный знак автомобиля. Состоит из букв, цифр и регионального кода.
          {/if}
        </div>
      </div>
    </div>
    <span>
      <input class="avtocod-form__submit-btn" type="submit" name="" value="Проверить" disabled="{!isIdentifierCorrect}">
    </span>
  </div>
</form>

<script lang="ts">
  import type { Identifier } from 'main'

  const data: Identifier[] = [
    {
      type: 'VIN',
      placeholder: 'JN1WNYD21U0000001',
      validator: /^[0-9A-Za-zА-Яа-я]{17}$/
    },
    {
      type: 'GRZ',
      placeholder: 'А001АА777',
      validator: /^[а-яА-Яa-zA-Z][0-9]{3}[а-яА-Яa-zA-Z]{2}[0-9]{2,3}$/
    }
  ]
  let currentIdentifier = data[1]
  let identifier = ''
  let isHintShown = false
  $: isIdentifierCorrect = currentIdentifier.validator.test(identifier)

  export let refid = ''
  export let chan = ''

  function handleSubmit() {
    const ID = identifier.toUpperCase()
		const utm =["utm_source="+location.hostname,"utm_medium=cpa","utm_campaign=form"];
		const params = this.action.split('?', 2);
		const outputParams = (params[1]) ? params[1]+'&':'';

    window.open("https://avtocod.ru/proverkaavto/"+ID+"?"+outputParams+utm.join("&"));
  }

  function handleClick(index: number) {
    reset()
    currentIdentifier = data[index]
  }

  function handleOnChange() {
    if (!isIdentifierCorrect && identifier) {
      isHintShown = true
      setTimeout(()=> {
        isHintShown = false
      }, 5000)
    }
  }

  function reset() {
    identifier = ''
    isHintShown = false
  }
</script>

<style>
  .input-wrap {
    display: inline-block;
    position: relative;
  }
  .avtocod-form
  {
    display: inline-block;
  }
  .avtocod-form *
  {
    font-family: "PT Sans","PT Sans Regular",sans-serif;
  }

  .avtocod-form__header
  {
    font-weight: bold;
    font-size: 21px;
    padding: 15px 0;
    text-align: center;
  }
  .avtocod-form__input,
  .avtocod-form__toggle-btn,
  .avtocod-form__submit-btn
  {
    height: 40px;
    background-color: #fff;
  }

  .avtocod-form input
  {
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 4px;
    box-sizing: border-box;
  }
  .avtocod-form__toggle-btn,
  .avtocod-form__submit-btn
  {
    padding: 0 5px;
    width: 100px;
  }

  .avtocod-form__submit-btn {
    background-color: #277cd7;
    color: white;
    transition: background-color .2s;
  }


  @media (max-width: 992px) {
    .avtocod-form__submit-btn {
      margin-top: 10px;
    }
  }

  .avtocod-form__submit-btn:disabled,
  .avtocod-form__submit-btn:disabled:hover
  {
    cursor: default;
    color: #cccccc;
    background-color: rgba(0,0,0,.08)
  }
  .avtocod-form__input
  {
    padding: 0 12px;
    min-width: 300px;
    text-transform: uppercase;
  }

  @media (max-width: 620px) {
    .avtocod-form__input {
      margin-top: 10px;
    }
  }

  @media (max-width: 450px) {
    .avtocod-form__input {
      width: 100%;
      min-width: 0;
    }
    .input-wrap {
      width: 100%;
    }
  }

  .avtocod-form__toggle-btn_active,
  .avtocod-form__submit-btn:hover
  {
    background-color: #2D5CD7;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 450px) {
    .avtocod-form__submit-btn {
      width: 100%;
    }
  }

  .arrow-box {
    position: absolute;
    background: #fff;
    border: 1px solid #c2e1f5;
    transform: translateY(10px);
    width: 100%;
  }
  .arrow-box:after,
  .arrow-box:before
  {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .arrow-box:after
  {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #277cd7;
    border-width: 3px;
    margin-left: -3px;
  }
  .arrow-box:before
  {
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: #277cd7;
    border-width: 9px;
    margin-left: -9px;
  }
  .arrow-box__text
  {
    display: inline-block;
    padding: 10px;
  }

  @media (max-width: 450px) {
    .avtocod-form__toggle-btn.avtocod-form__toggle-btn_grz,
    .avtocod-form__toggle-btn.avtocod-form__toggle-btn_vin {
      width: 48%;
    }

    .avtocod-form__toggle-btn.avtocod-form__toggle-btn_grz {
      float: left;
    }

    .avtocod-form__toggle-btn.avtocod-form__toggle-btn_vin {
      float: right;
    }
  }

</style>
