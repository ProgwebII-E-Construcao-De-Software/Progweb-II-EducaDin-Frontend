/* tslint:disable:no-inferrable-types no-redundant-jsdoc */
export const STATUS_ATIVO: string = 'ATIVO';

export const STATUS_INATIVO: string = 'INATIVO';

export const STATUS_SIM: string = 'SIM';

export const STATUS_NAO: string = 'NAO';

/**
 * Classe que disponibiliza as constantes de Status na aplicação.
 *
 * @author Guiliano Rangel (UEG)
 */
export class StatusAtivoInativo {

  public static readonly ATIVO: StatusAtivoInativo = new StatusAtivoInativo(true, 'Ativo');

  public static readonly INATIVO: StatusAtivoInativo = new StatusAtivoInativo(false, 'Inativo');

  /**
   * Construtor da classe.
   *
   * @param id
   * @param descricao
   */
  constructor(
    public id: boolean,
    public descricao: string
  ) {}
}

/**
 * Classe que disponibiliza as constantes de Status SimNao na aplicação.
 *
 * @author Guiliano Rangel (UEG)
 */
export class StatusSimNao {

  public static readonly SIM: StatusSimNao = new StatusSimNao('S', 'Sim');

  public static readonly NAO: StatusSimNao = new StatusSimNao('N', 'Não');

  /**
   * Construtor da classe.
   *
   * @param id
   * @param descricao
   */
  constructor(
    public id: string,
    public descricao: string
  ) {}
}

/**
 * Classe que disponibiliza as constantes de Tipos de Telefone na aplicação.
 *
 * @author Guiliano Rangel (UEG)
 */
export class PhoneType {

  public static readonly CELULAR: PhoneType = new PhoneType('1', 'Celular');
  public static readonly RESIDENCIAL: PhoneType = new PhoneType('2', 'Residencial');
  public static readonly COMERCIAL: PhoneType = new PhoneType('3', 'Comercial');

  /**
   * Construtor da classe.
   *
   * @param id
   * @param descricao
   */
  constructor(
    public id: string,
    public descricao: string
  ) {}
}
