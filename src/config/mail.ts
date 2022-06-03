interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'tiagoribeiro@digitaltracer.com.br',
      name: 'Tiago Ribeiro',
    },
  },
} as IMailConfig;
