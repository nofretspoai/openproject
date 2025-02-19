module Saml
  module Providers
    class TableComponent < ::OpPrimer::BorderBoxTableComponent
      columns :name, :users, :creator, :created_at

      mobile_columns :name, :users

      mobile_labels :users

      wide_columns :name

      def initial_sort
        %i[id asc]
      end

      def sortable?
        false
      end

      def empty_row_message
        I18n.t "saml.providers.no_results_table"
      end

      def mobile_title
        I18n.t("saml.providers.plural")
      end

      def headers
        [
          [:name, { caption: I18n.t("attributes.name") }],
          [:users, { caption: I18n.t(:label_user_plural) }],
          [:creator, { caption: I18n.t("js.label_created_by") }],
          [:created_at, { caption: Saml::Provider.human_attribute_name(:created_at) }]
        ]
      end

      def blank_title
        I18n.t("saml.providers.label_empty_title")
      end

      def blank_description
        I18n.t("saml.providers.label_empty_description")
      end

      def blank_icon
        :key
      end
    end
  end
end
