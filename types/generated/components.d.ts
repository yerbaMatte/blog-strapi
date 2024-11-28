import type { Struct, Schema } from '@strapi/strapi';

export interface FeaturesRicharea extends Struct.ComponentSchema {
  collectionName: 'components_features_richareas';
  info: {
    displayName: 'richarea';
    icon: 'apps';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface FeaturesPoster extends Struct.ComponentSchema {
  collectionName: 'components_features_posters';
  info: {
    displayName: 'Poster';
    icon: 'cast';
    description: '';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface FeaturesImage extends Struct.ComponentSchema {
  collectionName: 'components_features_images';
  info: {
    displayName: 'image';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface FeaturesCode extends Struct.ComponentSchema {
  collectionName: 'components_features_codes';
  info: {
    displayName: 'code';
    icon: 'code';
  };
  attributes: {
    code: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'features.richarea': FeaturesRicharea;
      'features.poster': FeaturesPoster;
      'features.image': FeaturesImage;
      'features.code': FeaturesCode;
    }
  }
}
