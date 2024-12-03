import type { Schema, Struct } from '@strapi/strapi';

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

export interface FeaturesPoster extends Struct.ComponentSchema {
  collectionName: 'components_features_posters';
  info: {
    description: '';
    displayName: 'Poster';
    icon: 'cast';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'features.code': FeaturesCode;
      'features.image': FeaturesImage;
      'features.poster': FeaturesPoster;
      'features.richarea': FeaturesRicharea;
    }
  }
}
